// background.js - receive message from content.js, opens popup & send message to update.js
console.log('background.js loaded');

let isPopupOpen = false;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'highlight') {
        console.log('Message received:', message);
        if (!isPopupOpen) {
            console.log('Opening popup');
            isPopupOpen = true;
            chrome.action.openPopup(() => {
                chrome.runtime.sendMessage({ type: 'highlight', text: message.text });
            });
        } else {
            console.log('Popup already open');
            chrome.runtime.sendMessage({ type: 'highlight', text: message.text });
        }
    }
});

chrome.runtime.onConnect.addListener((port) => {
    if (port.name === 'popup') {
      port.onDisconnect.addListener(() => {
        isPopupOpen = false;
      });
    }
  });