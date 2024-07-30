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
	// done by converting searchbar value t
	if (searchInput?.value) {
		const searchTerm = searchInput.value.toLowerCase().replace(/\s+/g, "");
		if (searchTerm.includes("ike")) {
			ike.textContent = "You just searched Ike, dumbass";
			ike.href = "https://www.youtube.com/watch?v=JsYWZSTbEPU";
			searchFilters.appendChild(ike);
			document.title = "You just searched Ike, dumbass";
			searchIke();
			ikeAudio.play();
		} else {
			bellPeper();
		}
	}
}

modifyText();
bellPeper();
