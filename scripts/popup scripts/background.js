// background.js - receive message from content.js, opens popup & send message to update.js
console.log('background.js loaded');

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'highlight') {
        console.log('Message received:', message);
        chrome.action.openPopup(() => {
            translateText(message.text).then(translatedText => {
                chrome.runtime.sendMessage({ type: 'highlight', text: message.text, translatedText: translatedText });
            }).catch(error => {
                console.error('Translation error:', error);
            });
        });
    }
});

function translateText(text) {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get("apiKey", function (data) {
            if (data.apiKey) {
                console.log("API Key:", data.apiKey);

                const url = `https://translation.googleapis.com/language/translate/v2?key=${data.apiKey}`;
                const requestData = {
                    q: text,
                    target: 'en'
                };

                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestData)
                })
                .then(response => response.json())
                .then(data => {
                    if (data.data && data.data.translations && data.data.translations.length > 0) {
                        resolve(data.data.translations[0].translatedText);
                    } else {
                        reject('Translation failed');
                    }
                })
                .catch(error => {
                    console.error('Error translating text:', error);
                    reject('Translation error');
                });
            } else {
                console.error("API Key not found!");
                reject('API Key not found');
            }
        });
    });
}