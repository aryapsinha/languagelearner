// chat.js - handle chat button click to open the local page

document.addEventListener('DOMContentLoaded', function () {
    const chatButton = document.getElementById('chat-button');
    chatButton.addEventListener('click', function () {
        console.log('Chat button clicked');
        
        // Open the local page in a new tab
        window.open('http://localhost:3000/', '_blank');
    });
});
