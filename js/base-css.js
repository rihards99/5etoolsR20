function baseCss () {
	d20plus.css = {};

	// Convert to regular CSS:
	// `[ ... rules ... ].map(it => `${it.s} {\n${it.r.split(";").map(str => str.trim()).join(";\n")}}\n`).join("\n")`
	d20plus.css.baseCssRules = [
		// generic
		{
			s: ".inline-block, .display-inline-block",
			r: "display: inline-block;"
		},
		{
			s: ".bold",
			r: "font-weight: bold;"
		},
		{
			s: ".text-center",
			r: "text-align: center;"
		},
		{
			s: ".is-error",
			r: "color: #d60000;"
		},
		{
			s: ".flex-label",
			r: "display: inline-flex; align-items: center;"
		},
		// // fix Roll20's <p> margins in the text editor // FIXME make this configurable
		// {
		// 	s: ".note-editable p",
		// 	r: "margin-bottom: 0;"
		// },
		// ensure rightclick menu width doesn't break layout // FIXME might be fixing the symptoms and not the cause
		{
			s: ".actions_menu.d20contextmenu > ul > li",
			r: "max-width: 100px;"
		},
		// page view enhancement
		{
			s: "#page-toolbar",
			r: "height: calc(90vh - 40px);"
		},
		{
			s: "#page-toolbar .container",
			r: "height: 100%; white-space: normal;"
		},
		{
			s: "#page-toolbar .pages .availablepage",
			r: "width: 100px; height: 100px;"
		},
		{
			s: "#page-toolbar .pages .availablepage img.pagethumb",
			r: "max-width: 60px; max-height: 60px;"
		},
		{
			s: "#page-toolbar .pages .availablepage span",
			r: "bottom: 1px;"
		},
		{
			s: "#page-toolbar",
			r: "background: #a8aaad80;"
		},
		// search
		{
			s: ".Vetoolsresult",
			r: "background: #ff8080;"
		},
		// config editor
		{
			s: "div.config-table-wrapper",
			r: "min-height: 200px; width: 100%; height: 100%; max-height: 460px; overflow-y: auto; transform: translateZ(0);"
		},
		{
			s: "table.config-table",
			r: "width: 100%; table-layout: fixed;"
		},
		{
			s: "table.config-table tbody tr:nth-child(odd)",
			r: "background-color: #f8f8f8;"
		},
		{
			s: "table.config-table tbody td > *",
			r: "vertical-align: middle; margin: 0;"
		},
		{
			s: ".config-name",
			r: "display: inline-block; line-height: 35px; width: 100%;"
		},
		// tool list
		{
			s: ".tools-list",
			r: "max-height: 70vh;"
		},
		{
			s: ".tool-row",
			r: "min-height: 40px; display: flex; flex-direction: row; align-items: center;"
		},
		{
			s: ".tool-row:nth-child(odd)",
			r: "background-color: #f0f0f0;"
		},
		{
			s: ".tool-row > *",
			r: "flex-shrink: 0;"
		},
		// warning overlay
		{
			s: ".temp-warning",
			r: "position: fixed; top: 12px; left: calc(50vw - 200px); z-index: 10000; width: 320px; background: transparent; color: red; font-weight: bold; font-size: 150%; font-variant: small-caps; border: 1px solid red; padding: 4px; text-align: center; border-radius: 4px;"
		},
		// GM hover text
		{
			s: ".Vetools-token-hover",
			r: "pointer-events: none; position: fixed; z-index: 100000; background: white; padding: 5px 5px 0 5px; border-radius: 5px;     border: 1px solid #ccc; max-width: 450px;"
		},
		// drawing tools bar
		{
			s: "#drawingtools.line_splitter .currentselection:after",
			r: "content: '✂️';"
		},
		// chat tag
		{
			s: ".userscript-hacker-chat",
			r: "margin-left: -45px; margin-right: -5px; margin-bottom: -7px; margin-top: -15px; display: inline-block; font-weight: bold; font-family: 'Lucida Console', Monaco, monospace; color: #20C20E; background: black; padding: 3px; min-width: calc(100% + 60px);"
		},
		{
			s: ".userscript-hacker-chat a",
			r: "color: white;"
		},
		{
			s: ".withoutavatars .userscript-hacker-chat",
			r: "margin-left: -15px; min-width: calc(100% + 30px);"
		},
		{
			s: ".Ve-btn-chat",
			r: "margin-top: 10px; margin-left: -35px;"
		},
		{
			s: ".withoutavatars .Ve-btn-chat",
			r: "margin-left: -5px;"
		},
		// Bootstrap-alikes
		{
			s: ".col",
			r: "display: inline-block;"
		},
		{
			s: ".col-1",
			r: "width: 8.333%;"
		},
		{
			s: ".col-2",
			r: "width: 16.666%;"
		},
		{
			s: ".col-3",
			r: "width: 25%;"
		},
		{
			s: ".col-4",
			r: "width: 33.333%;"
		},
		{
			s: ".col-5",
			r: "width: 41.667%;"
		},
		{
			s: ".col-6",
			r: "width: 50%;"
		},
		{
			s: ".col-7",
			r: "width: 58.333%;"
		},
		{
			s: ".col-8",
			r: "width: 66.667%;"
		},
		{
			s: ".col-9",
			r: "width: 75%;"
		},
		{
			s: ".col-10",
			r: "width: 83.333%;"
		},
		{
			s: ".col-11",
			r: "width: 91.667%;"
		},
		{
			s: ".col-12",
			r: "width: 100%;"
		},
		{
			s: ".ib",
			r: "display: inline-block;"
		},
		{
			s: ".float-right",
			r: "float: right;"
		},
		{
			s: ".mr-2",
			r: "margin-right: 0.5rem !important;"
		},
		{
			s: ".p-2",
			r: "padding: 0.5rem !important;"
		},
		{
			s: ".p-3",
			r: "padding: 1rem !important;"
		},
		{
			s: ".split",
			r: "display: flex; justify-content: space-between;"
		},
		{
			s: ".split--center",
			r: "align-items: center;"
		},
		// image rows
		{
			s: ".import-cb-label--img",
			r: "display: flex; height: 64px; align-items: center; padding: 4px;"
		},
		{
			s: ".import-label__img",
			r: "display: inline-block; width: 60px; height: 60px; padding: 0 5px;"
		},
		// importer
		{
			s: ".import-cb-label",
			r: "display: block; margin-right: -13px !important;"
		},
		{
			s: ".import-cb-label span",
			r: "display: inline-block; overflow: hidden; max-height: 18px; letter-spacing: -1px; font-size: 12px;"
		},
		{
			s: ".import-cb-label span.readable",
			r: "letter-spacing: initial"
		},
		{
			s: ".import-cb-label .source",
			r: "width: calc(16.667% - 28px);'"
		},
		// horizontal toolbar
		{
			s: "#secondary-toolbar:hover",
			r: "opacity: 1 !important;"
		},
		// addon layer bar
		{
			s: "#floatinglayerbar ul",
			r: "margin: 0; padding: 0;"
		},
		{
			s: "#floatinglayerbar li:hover, #floatinglayerbar li.activebutton",
			r: "color: #333; background-color: #54C3E8; cursor: pointer;"
		},
		{
			s: "#floatinglayerbar li",
			r: "padding: 3px; margin: 0; border-bottom: 1px solid #999; display: block; text-align: center; line-height: 22px; font-size: 22px; color: #999; position: relative;"
		},
		{
			s: "#floatinglayerbar.map li.choosemap, #floatinglayerbar.objects li.chooseobjects, #floatinglayerbar.gmlayer li.choosegmlayer, #floatinglayerbar.walls li.choosewalls, #floatinglayerbar.weather li.chooseweather, #floatinglayerbar.foreground li.chooseforeground",
			r: "background-color: #54C3E8; color: #333;"
		},
		// extra layer buttons
		{
			s: "#editinglayer.weather div.submenu li.chooseweather",
			r: "background-color: #54C3E8; color: #333;"
		},
		{
			s: "#editinglayer.weather .currentselection:after",
			r: "content: \"C\";"
		},
		{
			s: "#editinglayer.foreground div.submenu li.chooseforeground",
			r: "background-color: #54C3E8; color: #333;"
		},
		{
			s: "#editinglayer.foreground .currentselection:after",
			r: "content: \"B\";"
		},
		// adjust the "Talking to Yourself" box
		{
			s: "#textchat-notifier",
			r: "top: -5px; background-color: red; opacity: 0.5; color: white;"
		},
		{
			s: "#textchat-notifier:after",
			r: "content: '!'"
		},
		// fix the shitty undersized "fire" icon
		{
			s: ".choosewalls > .pictostwo",
			r: "width: 15px; height: 17px; display: inline-block; text-align: center;"
		},
		{
			s: "#editinglayer.walls > .pictos",
			r: "width: 20px; height: 22px; display: inline-block; text-align: center; font-size: 0.9em;"
		},
		// weather config window
		{
			s: ".ui-dialog .wth__row",
			r: "margin-bottom: 10px; align-items: center; padding: 0 0 5px; border-bottom: 1px solid #eee;"
		},
		{
			s: ".wth__row select",
			r: "margin-bottom: 0"
		},
		{
			s: `.wth__row input[type="range"]`,
			r: "width: calc(100% - 8px);"
		},
	];

	d20plus.css.baseCssRulesPlayer = [
		{
			s: ".player-hidden",
			r: "display: none !important;"
		}
	];

	d20plus.css.cssRules = []; // other scripts should populate this

	// Mirrors of 5etools CSS
	d20plus.css.cssRules = d20plus.css.cssRules.concat([
		{
			s: ".copied-tip",
			r: "pointer-events: none; position: fixed; background: transparent; user-select: none; z-index: 100000; width: 80px; height: 24px; line-height: 24px;"
		},
		{
			s: ".copied-tip > span",
			r: "display: inline-block; width: 100%; text-align: center;"
		},
		{
			s: ".help",
			r: "cursor: help; text-decoration: underline; text-decoration-style: dotted;"
		},
		{
			s: ".help--subtle",
			r: "cursor: help;"
		}
	]);

	// Art repo browser CSS
	d20plus.css.cssRules = d20plus.css.cssRules.concat([
		// full-width images search header
		{
			s: "#imagedialog .searchbox",
			r: "width: calc(100% - 10px)"
		},
		///////////////
		{
			s: ".artr__win",
			r: "display: flex; align-items: stretch; width: 100%; height: 100%; padding: 0 !important;"
		},
		// fix box sizing
		{
			s: ".artr__win *",
			r: "box-sizing: border-box;"
		},
		// custom scrollbars
		{
			s: ".artr__win *::-webkit-scrollbar",
			r: "width: 9px; height: 9px;"
		},
		{
			s: ".artr__win *::-webkit-scrollbar-track",
			r: "background: transparent;"
		},
		{
			s: ".artr__win *::-webkit-scrollbar-thumb",
			r: "background: #cbcbcb;"
		},
		///////////////
		{
			s: ".artr__side",
			r: "width: 300px; height: 100%; border-right: 1px solid #ccc; background: #f8f8f8; position: relative; flex-shrink: 0; display: flex; flex-direction: column;"
		},
		{
			s: ".artr__side__head",
			r: "flex-shrink: 0; font-weight: bold; margin-bottom: 7px; margin-bottom: 7px; border-bottom: 3px solid #ccc; background: white;"
		},
		{
			s: ".artr__side__head__title",
			r: "font-size: 16px; font-weight: bold;"
		},
		{
			s: ".artr__side__body",
			r: "flex-shrink: 0; overflow-y: auto; transform: translateZ(0);"
		},
		{
			s: ".artr__side__tag_header",
			r: "width: 100%; border-bottom: 1px solid #ccc; display: flex; justify-content: space-between; padding: 0 6px; cursor: pointer; margin-bottom: 10px;"
		},
		{
			s: ".artr__side__tag_grid",
			r: "display: flex; width: 100%; flex-wrap: wrap; margin-bottom: 15px; background: #f0f0f0; border-radius: 5px;"
		},
		{
			s: ".artr__side__tag",
			r: "padding: 2px 4px; margin: 2px 4px; font-size: 11px;"
		},
		{
			s: `.artr__side__tag[data-state="1"]`,
			r: "background-image: linear-gradient(#fff, #337ab7);"
		},
		{
			s: `.artr__side__tag[data-state="1"]:hover`,
			r: "background-image: linear-gradient(rgb(#337ab7), rgb(#337ab7)); background-position: 0; transition: none;"
		},
		{
			s: `.artr__side__tag[data-state="2"]`,
			r: "background-image: linear-gradient(#fff, #8a1a1b);"
		},
		{
			s: `.artr__side__tag[data-state="2"]:hover`,
			r: "background-image: linear-gradient(rgb(#8a1a1b), rgb(#8a1a1b)); background-position: 0; transition: none;"
		},
		{
			s: ".artr__main",
			r: "width: 100%; height: 100%; display: flex; overflow-y: auto; flex-direction: column; position: relative;"
		},
		{
			s: ".artr__side__loading, .artr__main__loading",
			r: "width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;     font-style: italic;"
		},
		{
			s: ".artr__bread",
			r: "width: 100%; margin-bottom: 2px;"
		},
		{
			s: ".artr__crumb",
			r: "border: 1px solid #ccc; border-radius: 5px; padding: 0 5px; display: inline-block; cursor: pointer; user-select: none;"
		},
		{
			s: ".artr__crumb--sep",
			r: "border: 0; cursor: default;"
		},
		{
			s: ".artr__search",
			r: "flex-shrink: 0; width: 100%; border-bottom: 1px solid #ccc; display: flex; flex-direction: column;"
		},
		{
			s: ".artr__search__field",
			r: "width: 100%; height: 26px;"
		},
		{
			s: ".artr__view",
			r: "position: absolute; top: 64px; bottom: 0; left: 0; right: 0; overflow-y: auto; transform: translateZ(0); background-color: whitesmoke;"
		},
		{
			s: ".artr__view_inner",
			r: "display: flex; width: 100%; height: 100%; flex-wrap: wrap; align-content: flex-start;"
		},
		{
			s: ".artr__no_results_wrp",
			r: "width: 100%; height: 100%; display: flex; justify-content: center;"
		},
		{
			s: ".artr__no_results",
			r: "width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;"
		},
		{
			s: ".artr__no_results_headline",
			r: "font-size: 125%; font-weight: bold;"
		},
		{
			s: ".artr__item",
			r: "width: 180px; margin: 5px; box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.75); display: block; background: white; position: relative;"
			// Using flex makes scrolling extremely sluggish
			// display: flex; flex-direction: column; cursor: pointer; float: left;
		},
		{
			s: ".artr__item__stats",
			r: "position: absolute; left: 0; top: 0; display: none;"
		},
		{
			s: ".artr__item:hover .artr__item__stats",
			r: "display: block;"
		},
		{
			s: ".artr__item__stats_item",
			r: "color: grey; background: white; border-radius: 5px; margin: 4px 2px; padding: 0 2px; text-align: center; border: 1px solid #e0e0e0"
		},
		{
			s: ".artr__item__menu",
			r: "position: absolute; right: 0; top: 0; display: none;"
		},
		{
			s: ".artr__item:hover .artr__item__menu",
			r: "display: block;"
		},
		{
			s: ".artr__item__menu_item",
			r: "cursor: pointer; color: grey; font-size: 26px; line-height: 24px; border-radius: 5px; margin: 4px 2px; padding: 2px; text-align: center; display: block;"
		},
		{
			s: ".artr__item--index",
			r: "height: 240px;"
		},
		{
			s: ".artr__item--item",
			r: "height: 180px;"
		},
		{
			s: ".artr__item:hover",
			r: "box-shadow: 0 0 8px 0 rgba(38, 167, 242, 1); opacity: 0.95;"
		},
		{
			s: ".artr__item--back",
			r: "display: flex; justify-content: center; align-items: center; font-size: 24px; color: #888;"
		},
		{
			s: ".artr__item__top",
			r: "width: 100%; height: 180px; flex-shrink: 0; margin: 0 auto; display: flex; align-items: center;"
		},
		{
			s: ".artr__item__top--quart",
			r: "display: flex; flex-wrap: wrap;"
		},
		{
			s: ".artr__item__bottom",
			r: "width: 100%; height: 60px; flex-shrink: 0;  border-top: 1px solid #ccc; background: #f8f8f8; display: flex; flex-direction: column; font-size: 12px; justify-content: space-evenly;"
		},
		{
			s: ".artr__item__bottom__row",
			r: "width: 100% height: 20px; flex-shrink: 0; padding: 4px; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"
		},
		{
			s: ".artr__item__thumbnail",
			r: "max-width: 100%; max-height: 100%; display: block; margin: 0 auto;"
		},
		{
			s: ".atr__item__quart",
			r: "width: 50%; height: 50%; display: block; margin: 0;"
		},
		{
			s: ".atr__item__quart--more",
			r: "display: flex; justify-content: center; align-items: center;"
		},
		{
			s: ".artr__item__full",
			r: "width: 100%; height: 180px; margin: 0 auto; display: flex; align-items: center; padding: 3px;"
		},
		{
			s: ".artr__wrp_big_img",
			r: "position: fixed; top: 0; bottom: 0; right: 0; left: 0; background: #30303080; padding: 30px; display: flex; justify-content: center; align-items: center; z-index: 99999;"
		},
		{
			s: ".artr__big_img",
			r: "display: block; max-width: 100%; max-height: 100%;"
		},
	]);
}

SCRIPT_EXTENSIONS.push(baseCss);
