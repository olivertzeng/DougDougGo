// ==UserScript==
// @name        DougDougGo JS
// @name:zh-TW  DougDougGo JS
// @namespace   https://duckduckgo.com
// @match       *://*duckduckgo.com/*
// @license     GPLv3
// @version     1.0
// @author      Oliver Tzeng
// @description DougDougGo is now your new search engine
// @description:zh-TW  DougDougGo 將是你獨一無二的搜尋引擎
// ==/UserScript==

const searchFilters = document.querySelector(".js-search-filters");
const smashText = document.createElement("a");
const ikeAudio = new Audio(browser.runtime.getURL("assets/ike.mp3"));
const smashCharacters = fetch(chrome.runtime.getURL("assets/smash.txt"))
	.then((response) => response.text())
	.then((text) => text.split("\n").filter((character) => character !== ""));

smashText.style.cssText = "float: right; margin-left: 10px"; // Adjust margin as needed

function bellPeper() {
	const fav = document.createElement("link");
	fav.rel = "icon";
	fav.href = chrome.runtime.getURL("assets/dougLight.png");
	document.head.appendChild(fav);

	// Check for dark mode preference
	if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
		fav.href = chrome.runtime.getURL("assets/dougDark.png");
	}
}

function searchSmash() {
	const fav = document.createElement("link");
	fav.rel = "icon";
	fav.href = chrome.runtime.getURL("assets/ike.gif");
	document.head.appendChild(fav);
}

async function modifyText() {
	const searchInput = document.querySelector("#search_form_input");
	const searchTerm = searchInput.value.toLowerCase().replace(/[-. ]+/g, "");

	if (searchInput?.value) {
		const characters = await smashCharacters;
		const matchedCharacters = characters.filter((character) =>
			searchTerm.includes(character.toLowerCase().replace(/[-. ]+/g, "")),
		);

		if (matchedCharacters.length) {
			let message = "";

			if (matchedCharacters.length > 3) {
				message = "You just searched a lot of Smash Bros, dumbass";
				smashText.textContent = message;
			} else {
				message = `You just searched ${matchedCharacters.slice(0, -1).join(", ") + (matchedCharacters.length > 1 ? ", and " : "") + matchedCharacters[matchedCharacters.length - 1]}, dumbass`;
				smashText.textContent = message;
			}
			smashText.href = "https://www.youtube.com/watch?v=JsYWZSTbEPU";
			searchFilters.appendChild(smashText);
			searchSmash();
			document.title = message;
			chrome.storage.sync.get(["soundEnabled"], (result) => {
				if (result.soundEnabled && matchedCharacters.includes("Ike")) {
					ikeAudio.play();
				}
			});
		} else if (document.title.includes("at DuckDuckGo")) {
			document.title = `${searchInput.value} at DougDougGo`;
		}
	}
}

bellPeper();
modifyText();
