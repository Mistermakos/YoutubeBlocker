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

const noShorts = () => {
    //Waits for changes (dynamicly loaded page requires this), then disconects.
    let observer = new MutationObserver((mutations, obs) => {
        let el = document.querySelector("[is-shorts]");
        if (el) {
            el.style.display = "none"
            obs.disconnect()
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    })
}

const noVideosOnMainSite = () => {
    //Waits for changes (dynamicly loaded page requires this), then disconects.
    let observer = new MutationObserver((mutations, obs) => {
        let el = document.body;
        if (el) {
            document.getElementsByTagName("ytd-rich-grid-renderer")[0].style.display = "none";
            obs.disconnect()
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

(function () {
    //dict: path -> function
    const routes = {
        "/": () => {
            noVideosOnMainSite();
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