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
        chrome.storage.local.get({ savedTerms: [] }, function (result) {
            const savedTerms = result.savedTerms;
            savedTerms.push({ selectedText, translatedText });
            chrome.storage.local.set({ savedTerms }, function () {
                console.log('Term saved');
                const event = new CustomEvent('savedTermsUpdated', { detail: savedTerms });
                document.dispatchEvent(event); // You can also target specific elements
                console.log("dispatched")
            });
        });
    });
});