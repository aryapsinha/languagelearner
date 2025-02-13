// content.js - detect highlighted text & send message to background.js
console.log('content.js loaded');

document.addEventListener('mouseup', function () {
  const selectedText = window.getSelection().toString().trim();
  const currentUrl = window.location.href; // Get the current page URL
  console.log('Selected text:', selectedText);
  console.log('Page URL:', currentUrl); // Log the URL
  
  if (selectedText.length > 0) {
    try {
      console.log('Sending message to background:', { type: 'highlight', text: selectedText, url: currentUrl });
      chrome.runtime.sendMessage({ type: 'highlight', text: selectedText, url: currentUrl });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }
  else
  {
    console.log('No text selected');
  }
});