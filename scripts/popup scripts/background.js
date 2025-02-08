// background.js - receive message from content.js, opens popup & send message to update.js
console.log('background.js loaded');

let isPopupOpen = false;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'highlight') {
        console.log('Message received:', message);
        chrome.action.openPopup(() => {
            chrome.runtime.sendMessage({ type: 'highlight', text: message.text });
        });
    }
});