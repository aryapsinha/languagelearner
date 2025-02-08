// content.js - detect highlighted text & send message to background.js
console.log('content.js loaded');

document.addEventListener('mouseup', function () {
  const selectedText = window.getSelection().toString().trim();
  console.log('Selected text:', selectedText);
  
  if (selectedText.length > 0) {
    chrome.runtime.sendMessage({ type: 'highlight', text: selectedText });
  }
  else
  {
    console.log('No text selected');
  }
});