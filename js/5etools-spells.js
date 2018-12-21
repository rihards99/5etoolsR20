function d20plusSpells () {
	d20plus.spells = {};

	d20plus.spells.formSpellUrl = function (fileName) {
		return d20plus.formSrcUrl(SPELL_DATA_DIR, fileName);
	};

	d20plus.spells._groupOptions = ["Level", "Spell Points", "Alphabetical", "Source"];
	d20plus.spells._listCols = ["name", "class", "level", "source"];
	d20plus.spells._listItemBuilder = (it) => `
		<span class="name col-4" title="name">${it.name}</span>
		<span class="class col-3" title="class">${it.classes.fromClassList.map(c => `CLS[${c.name}]`).join(", ")}</span>
		<span class="level col-3" title="level">LVL[${Parser.spLevelToFull(it.level)}]</span>
		<span title="source [Full source name is ${Parser.sourceJsonToFull(it.source)}]" class="source col-2">SRC[${Parser.sourceJsonToAbv(it.source)}]</span>`;
	d20plus.spells._listIndexConverter = (sp) => {
		return {
			name: sp.name.toLowerCase(),
			class: sp.classes.fromClassList.map(c => c.name.toLowerCase()),
			level: Parser.spLevelToFull(sp.level).toLowerCase(),
			source: Parser.sourceJsonToAbv(sp.source).toLowerCase()
		};
	};

	// Import Spells button was clicked
	d20plus.spells.button = function (forcePlayer) {
		const playerMode = forcePlayer || !window.is_gm;
		const url = playerMode ? $("#import-spell-url-player").val() : $("#import-spell-url").val();
		if (url && url.trim()) {
			const handoutBuilder = playerMode ? d20plus.spells.playerImportBuilder : d20plus.spells.handoutBuilder;

			DataUtil.loadJSON(url).then((data) => {
				d20plus.importer.addMeta(data._meta);
				d20plus.importer.showImportList(
					"spell",
					data.spell,
					handoutBuilder,
					{
						groupOptions: d20plus.spells._groupOptions,
						forcePlayer,
						listItemBuilder: d20plus.spells._listItemBuilder,
						listIndex: d20plus.spells._listCols,
						listIndexConverter: d20plus.spells._listIndexConverter
					}
				);
			});
		}
	};

	// Import All Spells button was clicked
	d20plus.spells.buttonAll = function (forcePlayer) {
		const toLoad = Object.keys(spellDataUrls).filter(src => !SourceUtil.isNonstandardSource(src)).map(src => d20plus.spells.formSpellUrl(spellDataUrls[src]));

		if (toLoad.length) {
			const handoutBuilder = !forcePlayer && window.is_gm ? d20plus.spells.handoutBuilder : d20plus.spells.playerImportBuilder;

			DataUtil.multiLoadJSON(toLoad.map(url => ({url: url})), () => {
			}, (dataStack) => {
				let toAdd = [];
				dataStack.forEach(d => toAdd = toAdd.concat(d.spell));
				d20plus.importer.showImportList(
					"spell",
					toAdd,
					handoutBuilder,
					{
						groupOptions: d20plus.spells._groupOptions,
						forcePlayer,
						listItemBuilder: d20plus.spells._listItemBuilder,
						listIndex: d20plus.spells._listCols,
						listIndexConverter: d20plus.spells._listIndexConverter
					}
				);
			});
		}
	};

	// Create spell handout from js data object
	d20plus.spells.handoutBuilder = function (data, overwrite, inJournals, folderName, saveIdsTo, options) {
		// make dir
		const folder = d20plus.importer.makeDirTree(`Spells`, folderName);
		const path = ["Spells", folderName, data.name];

		// handle duplicates/overwrites
		if (!d20plus.importer._checkHandleDuplicate(path, overwrite)) return;

		const name = data.name;
		// build spell handout
		d20.Campaign.handouts.create({
			name: name,
			tags: d20plus.importer.getTagString([
				Parser.spSchoolAbvToFull(data.school),
				Parser.spLevelToFull(data.level),
				...data.classes.fromClassList.map(c => c.name),
				Parser.sourceJsonToFull(data.source)
			], "spell")
		}, {
			success: function (handout) {
				if (saveIdsTo) saveIdsTo[UrlUtil.URL_TO_HASH_BUILDER[UrlUtil.PG_SPELLS](data)] = {name: data.name, source: data.source, type: "handout", roll20Id: handout.id};

				const [notecontents, gmnotes] = d20plus.spells._getHandoutData(data, options);

				console.log(notecontents);
				handout.updateBlobs({notes: notecontents, gmnotes: gmnotes});
				handout.save({notes: (new Date).getTime(), inplayerjournals: inJournals});
				d20.journal.addItemToFolderStructure(handout.id, folder.id);
			}
		});
	};

	d20plus.spells.playerImportBuilder = function (data) {
		const [notecontents, gmnotes] = d20plus.spells._getHandoutData(data);

		const importId = d20plus.ut.generateRowId();
		d20plus.importer.storePlayerImport(importId, JSON.parse(gmnotes));
		d20plus.importer.makePlayerDraggable(importId, data.name);
	};

	d20plus.spells._getHandoutData = function (data, builderOptions) {
		builderOptions = builderOptions || {};
		// merge in roll20 metadata, if available
		const spellMeta = spellMetaData.spell.find(sp => sp.name.toLowerCase() === data.name.toLowerCase() && sp.source.toLowerCase() === data.source.toLowerCase());
		if (spellMeta) {
			data.roll20 = spellMeta.data;
		}

		if (!data.school) data.school = "A";
		if (!data.range) data.range = "Self";
		if (!data.duration) data.duration = "Instantaneous";
		if (!data.components) data.components = "";
		if (!data.time) data.components = "1 action";

		const r20Data = {};
		if (data.roll20) Object.assign(r20Data, data.roll20);
		Object.assign(
			r20Data,
			{
				"Level": builderOptions.isSpellPoints ? String(Math.min(9, d20plus.spells.spLevelToSpellPoints(data.level))) : String(data.level),
				"Range": Parser.spRangeToFull(data.range),
				"School": Parser.spSchoolAbvToFull(data.school),
				"Source": "5etoolsR20",
				"Classes": d20plus.importer.getCleanText(Parser.spClassesToFull(data.classes)),
				"Category": "Spells",
				"Duration": Parser.spDurationToFull(data.duration),
				"Material": "",
				"Components": d20plus.spells._parseComponents(data.components),
				"Casting Time": Parser.spTimeListToFull(data.time)
			}
		);

		if (data.range.type === "point" && (data.range.distance.type === UNT_FEET || data.range.distance.type === UNT_MILES)) {
			r20Data["data-RangeNum"] = data.range.distance.amount + "";
		}

		var r20json = {
			name: data.name,
			content: "",
			htmlcontent: "",
			data: r20Data
		};
		if (data.components && data.components.m) {
			if (data.components.m.text) r20json.data["Material"] = data.components.m.text;
			else if (typeof data.components.m === "string") r20json.data["Material"] = data.components.m;
		}
		if (data.meta) {
			if (data.meta.ritual) r20json.data["Ritual"] = "Yes";
		}
		if (data.duration.filter(d => d.concentration).length > 0) {
			r20json.data["Concentration"] = "Yes";
		}
		var notecontents = "";
		var gmnotes = "";
		notecontents += `<p><h3>${data.name}</h3>
<em>${Parser.spLevelSchoolMetaToFull(data.level, data.school, data.meta)}${builderOptions.isSpellPoints && data.level ? ` (${d20plus.spells.spLevelToSpellPoints(data.level)} spell points)` : ""}</em></p><p>
<strong>Casting Time:</strong> ${Parser.spTimeListToFull(data.time)}<br>
<strong>Range:</strong> ${Parser.spRangeToFull(data.range)}<br>
<strong>Components:</strong> ${Parser.spComponentsToFull(data.components)}<br>
<strong>Duration:</strong> ${Parser.spDurationToFull(data.duration)}<br>
</p>`;
		const renderer = new EntryRenderer();
		const renderStack = [];
		const entryList = {type: "entries", entries: data.entries};
		renderer.setBaseUrl(BASE_SITE_URL);
		renderer.recursiveEntryRender(entryList, renderStack, 1);
		r20json.content = d20plus.importer.getCleanText(renderStack.join(" "));
		r20json.data["data-description"] = r20json.content;
		notecontents += renderStack.join("");
		if (data.entriesHigherLevel) {
			const hLevelRenderStack = [];
			const higherLevelsEntryList = {type: "entries", entries: data.entriesHigherLevel};
			renderer.recursiveEntryRender(higherLevelsEntryList, hLevelRenderStack, 2);
			const higherLevels = d20plus.importer.getCleanText(hLevelRenderStack.join(" ").replace("At Higher Levels.", ""));
			r20json.content += "\n\n\"At Higher Levels: " + higherLevels;
			r20json.htmlcontent += "<br><br>\"At Higher Levels: " + higherLevels;
			notecontents += hLevelRenderStack.join("");
			r20Data["Higher Spell Slot Desc"] = higherLevels;
		}
		notecontents += `<p><strong>Classes:</strong> ${Parser.spClassesToFull(data.classes)}</p>`;
		gmnotes = JSON.stringify(r20json);
		notecontents += `<del class="hidden">${gmnotes}</del>`;

		return [notecontents, gmnotes];
	};

	// parse spell components
	d20plus.spells._parseComponents = function (components) {
		const out = [];
		if (components && components.v) out.push("V");
		if (components && components.s) out.push("S");
		if (components && components.m) out.push("M");
		return out.join(" ");
	};

	d20plus.spells.spLevelToSpellPoints = function (level) {
		switch (level) {
			case 1:
				return 2;
			case 2:
				return 3;
			case 3:
				return 5;
			case 4:
				return 6;
			case 5:
				return 7;
			case 6:
				return 8;
			case 7:
				return 10;
			case 8:
				return 11;
			case 9:
				return 13;
			case 0:
			default:
				return 0;
		}
	};
}

SCRIPT_EXTENSIONS.push(d20plusSpells);
