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

// kudos to https://greasyfork.org/en/scripts/4908-play-tone
function playIke(e){
  // create audio tag for WAV file
  var el = document.createElement("audio");
  el.setAttribute("autoplay", "autoplay");
  // grab tone file from my site; to avoid mixed content, omit the protocol
  el.setAttribute("src", "//download1511.mediafire.com/03ahvuacfungbBA7IIJnR1E089LtH73FVcKJxsXDYP99oJebk0y36nfXuQgQSy1E3E3H0yFfeA0UrhsplD0__0NA_ptssqjg8zMyrn1ZL4H8pclemfPjWK-ccMGi2uCK6ReEVz3iWkdleAmZX3RvBjd56BQYXumz5T6X8ZYCIHpISw/u6ty7mdp5zrk1as/ike.mp3");
  // add to document body
  document.body.appendChild(el);
}


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
    fav.href = "https://static.wixstatic.com/media/08e73c_bd7c7956c35f494ebade57f2e26ba49a~mv2.gif";
    document.head.appendChild(fav);
}

// You just said Ike, dumbass
function modifyText() {
    var searchInput = document.querySelector('#search_form_input');
    if (searchInput && searchInput.value.toLowerCase().includes("ike")) {
        ike.textContent = "You just searched Ike, dumbass";
        ike.href = 'https://www.youtube.com/watch?v=JsYWZSTbEPU';
        document.title = "You just searched Ike, dumbass";
        searchFilters.appendChild(ike);
        searchIke();
        playIke();
    } else{
        bellPeper();
    }
}

bellPeper();
modifyText();
playIke();
