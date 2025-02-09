// save.js - handle save button click
console.log('save.js loaded');

document.addEventListener('DOMContentLoaded', function () {
    const saveButton = document.getElementById('save-button');
    saveButton.addEventListener('click', function () {
        const selectedText = document.getElementById('selected-text').textContent;
        const translatedText = document.getElementById('translated-text').textContent;
        
        console.log('Save button clicked');
        console.log('Selected Text:', selectedText);
        console.log('Translated Text:', translatedText);

        // Save the terms to local storage
        // Get the URL of the active tab
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            const activeTab = tabs[0];
            const url = activeTab.url;
            console.log('URL:', url);

            chrome.storage.local.get({ savedTerms: [] }, function (result) {
                const savedTerms = result.savedTerms;
                savedTerms.push({ selectedText, translatedText, url });
                chrome.storage.local.set({ savedTerms }, function () {
                    console.log('Term saved');
                });
            });
        });
    });
});