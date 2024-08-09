// ==UserScript==
// @name        DougDougGo JS
// @name:zh-TW  DougDougGo JS
// @namespace   https://duckduckgo.com
// @match       *://*duckduckgo.com/*
// @license     GPLv3
// @version     1.2
// @author      Oliver Tzeng
// @description DougDougGo is now your new search engine
// @description:zh-TW  DougDougGo 將是你獨一無二的搜尋引擎
// ==/UserScript==

// Adds pajamasam in ddg's ai
const url = new URL(window.location.href);
const iaParam = url.searchParams.get("ia");

function bellPepper() {
	const fav = document.createElement("link");
	fav.rel = "icon";
	fav.href = chrome.runtime.getURL("assets/dougLight.png");
	document.head.appendChild(fav);

	// Dark Mode
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
		const smashText = document.createElement("a");
		const smashCharacters = fetch(chrome.runtime.getURL("assets/smash.txt"))
			.then((response) => response.text())
			.then((text) => text.split("\n").filter((character) => character !== ""));
		smashText.style.cssText = "float: right; margin-left: 10px";
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
			const textPosition = document.querySelector(".RHsWhMlxc4ETEMDS9ltw");
			textPosition.appendChild(smashText);
			searchSmash();
			document.title = message;
			if (matchedCharacters.includes("Ike")) {
				const ikeAudio = new Audio(chrome.runtime.getURL("assets/ike.mp3"));
				ikeAudio.play();
			}
		} else if (document.title.includes("at DuckDuckGo")) {
			document.title = `${searchInput.value} at DougDougGo`;
		}
	}
}

bellPepper();
modifyText();
