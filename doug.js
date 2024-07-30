// ==UserScript==
// @name        DougDougGo JS
// @name:zh-TW  DougDougGo JS
// @namespace   https://duckduckgo.com
// @match       *://*duckduckgo.com/*
// @license     GPLv3
// @grant       none
// @version     1.1
// @author      Oliver Tzeng
// @description DougDougGo is now your new search engine
// @description:zh-TW  DougDougGo 將是你獨一無二的搜尋引擎
// ==/UserScript==

const searchFilters = document.querySelector(".js-search-filters");
const ike = document.createElement("a");
const ikeAudio = new Audio("assets/ike.mp3");

// Changes favicon to a weird bell pepper
function bellPeper() {
	var fav = document.createElement("link");
	fav.rel = "icon";
	fav.href = "https://i.imgur.com/6O47rNT.png";
	document.head.appendChild(fav);
}

function searchIke() {
	var fav = document.createElement("link");
	fav.rel = "icon";
	fav.href =
		"https://static.wixstatic.com/media/08e73c_bd7c7956c35f494ebade57f2e26ba49a~mv2.gif";
	document.head.appendChild(fav);
}

// You just said Ike, dumbass
function modifyText() {
	var searchInput = document.querySelector("#search_form_input");
	if (searchInput && searchInput.value.toLowerCase().includes("ike")) {
		ike.textContent = "You just searched Ike, dumbass";
		ike.href = "https://www.youtube.com/watch?v=JsYWZSTbEPU";
		document.title = "You just searched Ike, dumbass";
		searchFilters.appendChild(ike);
		searchIke();
		ikeAudio.play();
	} else {
		bellPeper();
	}
}

bellPeper();
modifyText();
playIke();
