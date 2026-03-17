// ==UserScript==
// @name         YoutubeBlocker
// @namespace    http://tampermonkey.net/
// @version      2026-03-17
// @description  Making youtube less agressive (no shorts, clear main page etc.)
// @author       Maciej Grze
// @match        https://www.youtube.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @run-at document-idle
// ==/UserScript==

const HomePageVideosBlocker = () => {
    const targetNode = document.body;
    const config = { childList: true, subtree: true };

    const callback = (mutationList, observer) => {
        for (const mutation of mutationList) {
            if (mutation.type === "childList") {
                document.getElementsByTagName("ytd-rich-grid-renderer")[0].style.display = "none";
                console.log("Works!");
            };
        }
    };

    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
}

const ShortsBlocker = () => {
    const targetNode = document.body;
    const config = { childList: true, subtree: true };

    const callback = (mutationList, observer) => {
        for (const mutation of mutationList) {
            if (mutation.type === "childList") {
                document.querySlector("[is-shorts]").style.display = "none";
                console.log("Works on shorts!");
            };
        }
    };

    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
}

(function() {
    window.addEventListener('load', () => {
        HomePageVideosBlocker();
        ShortsBlocker();
    });
})();