import logo from './logo.svg';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { useState } from 'react';
import './App.css';

function NewRow({ eng, span, source, onStarClick, isStarred }) {
  return (
    <tr>
      <td>{eng}</td>
      <td>{span}</td>
      <td>{source}</td>
      <td>
        {/* Display star icon, and add a class if it's starred */}
        <span
          onClick={() => onStarClick(span)} // Star toggles based on Spanish word
          style={{
            cursor: 'pointer',
            color: isStarred ? 'gold' : 'gray', // Change color if starred
          }}
        >
          ★
        </span>
      </td>
    </tr>
  );
}

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("");
  const [selectedWords, setSelectedWords] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("spanish");

  const spanishVocabulary = [
    { eng: "Hello", spanish: "Hola", source: "url" },
    { eng: "Cat", spanish: "Gato", source: "url" },
    { eng: "Cockroach", spanish: "Cucaracha", source: "url" },
    { eng: "Pencil Sharpener", spanish: "Sacapuntas", source: "url" },
  ];

  const chineseVocabulary = [
    { eng: "Hello", chinese: "你好", source: "url" },
    { eng: "Bye", chinese: "再见", source: "url" },
    { eng: "Thank you", chinese: "谢谢", source: "url" },
    { eng: "Funny", chinese: "好笑", source: "url" },
    // Add more Chinese words as needed
  ];

  const vocabularyList = selectedLanguage === "spanish" ? spanishVocabulary : chineseVocabulary;


  // Handle star click: Toggle the selected state based on Spanish word
  const handleStarClick = (word) => {
    setSelectedWords((prevSelected) => {
      // If the word is already selected, remove it (unstared)
      if (prevSelected.includes(word)) {
        return prevSelected.filter((item) => item !== word);
      }
      // Otherwise, add it to the list (starred)
      return [...prevSelected, word];
    });
  };

  const startConversation = async () => {
    if (!language || !selectedWords.length) {
      alert("Please provide both language and vocabulary words.");
      return;
    }

    try {
      // Send language and words to the backend to initialize conversation
      const response = await axios.post("http://localhost:4000/start-conversation", {
        language: language,
        words: selectedWords.join(", "),
      });

      // Set the assistant's first message in the conversation history
      setMessages([{ role: "assistant", content: response.data.message }]);
    } catch (error) {
      console.error("Error starting conversation:", error);
    }
  };


  const sendMessage = async () => {
    if (!input) return;

    // Add the user message to the messages state
    setMessages([...messages, { role: "user", content: input }]);

    try {
      console.log("hello");
      // Send the message to the backend server (make sure to use the correct backend URL)
      const response = await axios.post("http://localhost:4000/chat", {
        messages: [...messages, { role: "user", content: input }],
      });

      console.log(response.data)

      // Add assistant response to the messages state
      setMessages([
        ...messages,
        { role: "user", content: input },
        { role: "assistant", content: response.data.message },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setInput(""); // Clear the input
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-left">
        <div className="col-6">
          <br />
          <h1>My Words</h1>
          <div className="language-label-container">
            <label>Choose Language: </label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              style={{ marginLeft: "10px" }}
            >
              <option value="spanish">Spanish</option>
              <option value="chinese">Chinese</option>
            </select>
          </div>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>English</th>
                <th>{selectedLanguage === "spanish" ? "Spanish" : "Chinese"}</th>
                <th>Source</th>
                <th>Star</th>
              </tr>
            </thead>
            <tbody>
              {vocabularyList.map((word, index) => (
                <NewRow
                  key={index}
                  eng={word.eng}
                  span={selectedLanguage === "spanish" ? word.spanish : word.chinese}
                  source={word.source}
                  onStarClick={handleStarClick}
                  isStarred={selectedWords.includes(selectedLanguage === "spanish" ? word.spanish : word.chinese)}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-6 pt-4">
          <h1>Chatbot</h1>

          {/* Language and vocabulary input fields */}
          <div className="language-choice-container">
            <label>Language: </label>
            <div className="language-input-container">
              <input
                type="text"
                placeholder="Enter a language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="language-input"
              />
            </div>

          </div>
          <div className="vocabulary-words-container">
            <label>Vocabulary words (star from table): </label>
            <div className="starred-words-container">
              <input
                type="text"
                placeholder="Starred words"
                value={selectedWords.join(", ")}
                readOnly
                className="starred-words-input"
                style={{
                  width: `${Math.max(200, selectedWords.length * 10)}px`, // Dynamically adjust width
                }}
              />
            </div>

          </div>
          <button onClick={startConversation} className="light-blue-button">
            Start Conversation
          </button>

          {/* Chatbox for displaying messages */}
          <div className="chat-box" style={{ maxHeight: "300px", overflowY: "auto", marginTop: "20px" }}>
            {messages.map((message, index) => (
              <div key={index} className={message.role}>
                <strong>{message.role === "user" ? "You" : "Assistant"}: </strong>
                <p>{message.content}</p>
              </div>
            ))}
          </div>

          {/* Input field for user to send a message */}
          <div style={{ marginTop: "20px" }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              style={{ width: "80%", padding: "10px" }}
            />
            <button onClick={sendMessage} className="send-button">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

/*
function NewRow(eng, span) {
  return (
      <tr>
          <td>
              {eng}
          </td>
          <td>
              {span}
          </td>
      </tr>
  )
}

export default function Load(){

  return (
      <table>
          <NewRow eng="Hello" span="Hola" />
      </table>
  )

}*/
