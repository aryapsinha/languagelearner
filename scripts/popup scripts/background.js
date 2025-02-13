// background.js - receive message from content.js, opens popup & send message to update.js
console.log('background.js loaded');

let languageMap = {};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'highlight') {
        console.log('Message received:', message);
        chrome.action.openPopup(() => {
            translateText(message.text).then(({ translatedText, detectedLanguage }) => {
                const languageName = new Intl.DisplayNames(['en'], { type: 'language' }).of(detectedLanguage).split(' ')[0];
                console.log('Language Name:', languageName);
                chrome.runtime.sendMessage({ 
                    type: 'highlight', 
                    text: message.text, 
                    translatedText: translatedText, 
                    detectedLanguage: languageName,
                    url: message.url // Pass the page URL here
                });
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

                const detectUrl = `https://translation.googleapis.com/language/translate/v2/detect?key=${data.apiKey}`;
                const translateUrl = `https://translation.googleapis.com/language/translate/v2?key=${data.apiKey}`;

                const requestData = {
                    q: text
                };

                // Detect the language of the input text
                fetch(detectUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestData)
                })
                .then(response => response.json())
                .then(data => {
                    if (data.data && data.data.detections && data.data.detections.length > 0) {
                        const detectedLanguage = data.data.detections[0][0].language;
                        console.log("Detected Language:", detectedLanguage);

                        // Translate the text to English
                        const translateRequestData = {
                            q: text,
                            target: 'en'
                        };

                        fetch(translateUrl, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(translateRequestData)
                        })
                        .then(response => response.json())
                        .then(data => {
                            if (data.data && data.data.translations && data.data.translations.length > 0) {
                                const translatedText = data.data.translations[0].translatedText;
                                resolve({ translatedText, detectedLanguage });
                            } else {
                                reject('Translation failed');
                            }
                        })
                        .catch(error => {
                            console.error('Error translating text:', error);
                            reject('Translation error');
                        });
                    } else {
                        reject('Language detection failed');
                    }
                })
                .catch(error => {
                    console.error('Error detecting language:', error);
                    reject('Language detection error');
                });
            } else {
                console.error("API Key not found!");
                reject('API Key not found');
            }
        });
    });
}