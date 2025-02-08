// content.js - detect highlighted text
$(document).on('mouseup', function () { // on mouse button release
    const selectedText = window.getSelection().toString().trim();
    
    // send a message to the background script with the selected text
    if (selectedText.length > 0) {
      chrome.runtime.sendMessage({ type: 'highlight', text: selectedText });
    }
});