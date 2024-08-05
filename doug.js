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

// Check if the script is to be executed for the "chat" condition
if (iaParam === "chat") {
	const updateNodes = () => {
		const darkness = document.querySelectorAll(".yGEuosa_aZeFroGMfpgu");

		for (const element of darkness) {
			if (element.tagName === "P") {
				element.textContent =
					"Darkness has approached, please try again tomorrow.";
			}
		}
	};

	updateNodes();

	let isUpdating = false;

	// PERF: observe if it's already updating
	// if it is dont bother
	const observer = new MutationObserver((mutations) => {
		if (isUpdating) return;
		isUpdating = true;

		// Use a timeout to allow the code to finish processing mutations
		setTimeout(() => {
			for (const mutation of mutations) {
				if (mutation.addedNodes.length || mutation.removedNodes.length) {
					updateNodes();
				}
			}
			isUpdating = false;
		}, 100);
	});

	observer.observe(document.body, { childList: true, subtree: true });
}

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
		const searchFilters = document.querySelector(".js-search-filters");
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
			searchFilters.appendChild(smashText);
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
