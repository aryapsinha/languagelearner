// update.js - receive message from background.js & update popup with text
console.log('update.js loaded');

chrome.runtime.onMessage.addListener((message) => {
    if (message.type === 'highlight') {
        console.log('Updating popup with text:', message.text);
        document.getElementById('selected-text').textContent = message.text;
        console.log('Updating popup with translated text:', message.translatedText);
        document.getElementById('translated-text').textContent = message.translatedText;
    }
});