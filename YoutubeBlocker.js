// ==UserScript==
// @name         YoutubeBlocker
// @namespace    http://tampermonkey.net/
// @version      2026-03-17
// @description  Making youtube less agressive (no shorts, clear main page etc.)
// @author       Maciej Grze
// @match        https://www.youtube.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

const refactoredObserver = (fun, ele) => {
    //Waits for changes (dynamicly loaded page requires this), and uses passed function
    let observer = new MutationObserver((mutations, obs) => {
        fun();
    })

    observer.observe(ele, {
        childList: true,subtree: true
    })
}

const noShorts = () => {
    refactoredObserver(()=>{
        document.querySelector("[is-shorts]").remove()
    }, document.body )
}

const noVideosOnMainSite = () => {
    refactoredObserver(()=>{
        document.getElementsByTagName("ytd-rich-grid-renderer")[0].style.display = "none";
    }, document.body )
}

const commentsOnly = () => {
    refactoredObserver(()=>{
        document.getElementById("secondary").remove();
    }, document.body )
}

(function() {
    //dict: path -> function
    const routes = {
        "/": () => {
            noVideosOnMainSite();
        },
        "/watch": () => {
            commentsOnly();
        },
        "/feed/subscriptions": () => {
            noShorts();
        }
    }

    const runRoute = () => {
        routes[window.location.pathname]();
    }

    window.addEventListener('yt-navigate-finish', runRoute);
    runRoute();
})();