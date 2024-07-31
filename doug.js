// @name        DougDougGo JS
// @name:zh-TW  DougDougGo JS
// @namespace   https://duckduckgo.com
// @match       *://*duckduckgo.com/*
// @license     GPLv3
// @grant       none
// @version     1.0
// @author      Oliver Tzeng
// @description DougDougGo is now your new search engine
// @description:zh-TW  DougDougGo 將是你獨一無二的搜尋引擎

const searchFilters = document.querySelector(".js-search-filters");
const ike = document.createElement("a");
const ikeAudio = new Audio(browser.runtime.getURL("assets/ike.mp3"));
const dougAI = document.querySelector(".SeMO2DqOjxoKrCHhR0yN");
ike.style.cssText = "float: right; margin-left: 10px"; // adjust the margin as needed

function bellPeper() {
	const fav = document.createElement("link");
	fav.rel = "icon";
	fav.href = chrome.runtime.getURL("assets/pepper.png");
	document.head.appendChild(fav);
}

function searchIke() {
	const fav = document.createElement("link");
	fav.rel = "icon";
	fav.href = chrome.runtime.getURL("assets/ike.gif");
	document.head.appendChild(fav);
}

function modifyText() {
	const searchInput = document.querySelector("#search_form_input");
	// detect if the searchbar includes "ike"
	if (searchInput?.value) {
		const searchTerm = searchInput.value.toLowerCase().replace(/\s+/g, "");
		bellPeper();
		if (searchTerm.includes("ike")) {
			ike.textContent = "You just searched Ike, dumbass";
			ike.href = "https://www.youtube.com/watch?v=JsYWZSTbEPU";
			searchFilters.appendChild(ike);
			document.title = "You just searched Ike, dumbass";
			searchIke();
			ikeAudio.play();
		} else if (document.title.includes("at DuckDuckGo")) {
			document.title = `${searchInput.value} at DougDougGo`;
		}
	} else {
		bellPeper();
	}
}

function applyStyles() {
	// Prefers Light theme
	for (const img of document.querySelectorAll(
		"img.minimal-homepage_minimalHeroLogo__QSVlf:nth-child(2)",
	)) {
		img.src = browser.runtime.getURL("assets/smallLight.png");
	}

	for (const img of document.querySelectorAll(
		"img.minimal-homepage_minimalHeroLogo__QSVlf:nth-child(5)",
	)) {
		img.src = browser.runtime.getURL("assets/bigLight.png");
	}

	for (const logo of document.querySelectorAll(".header__logo")) {
		logo.style.backgroundImage = `url(${browser.runtime.getURL("assets/pepper.png")})`;
	}

	// Prefers Dark theme
	if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
		for (const img of document.querySelectorAll(
			"img.minimal-homepage_minimalHeroLogo__QSVlf:nth-child(2)",
		)) {
			img.src = browser.runtime.getURL("assets/smallDark.png");
		}

		for (const img of document.querySelectorAll(
			"img.minimal-homepage_minimalHeroLogo__QSVlf:nth-child(5)",
		)) {
			img.src = browser.runtime.getURL("assets/bigDark.png");
		}

		for (const logo of document.querySelectorAll(".header__logo")) {
			logo.style.backgroundImage = `url(${browser.runtime.getURL("assets/pepper.png")})`;
		}
	}

	dougAI.textContent = "DougDougGo AI Chat";
}

// Run the styles on page load
document.addEventListener("DOMContentLoaded", applyStyles);

modifyText();
