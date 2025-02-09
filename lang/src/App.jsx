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

  const vocabulary = [
    { eng: "Hello", span: "Hola", source: "url" },
    { eng: "Cat", span: "Gato", source: "url" },
    { eng: "Cucaracha", span: "Cockroach", source: "url" },
    { eng: "Sacapuntas", span: "Pencil Sharpener", source: "url" },
  ];

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

  /*return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );*/
  return (
    <div className = "container">
      <div className = "row justify-content-left">
        <div className = "col-6">
          <br />
          <h1>My Words</h1>
          <table className = "table table-bordered table-striped">
              <thead>
                <tr>
                  <th>English</th>
                  <th>Spanish</th>
                  <th>Source</th>
                  <th>Star</th>
                </tr>
              </thead>
              <tbody>
  {vocabulary.map((word, index) => (
    <NewRow
      key={index}
      eng={word.eng}
      span={word.span}
      source={word.source}
      onStarClick={handleStarClick}
      isStarred={selectedWords.includes(word.span)} // Check if the Spanish word is starred
    />
  ))}
</tbody>
          </table>
        </div>
        <div className="col-6">
          <h1>Chatbot</h1>

          {/* Language and vocabulary input fields */}
          <div>
            <label>Language: </label>
            <input
              type="text"
              placeholder="Enter the language you are learning"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            />
          </div>
          <div>
            <label>Vocabulary words (star from table): </label>
            <input
              type="text"
              placeholder="Starred words"
              value={selectedWords.join(", ")}
              readOnly
            />
          </div>
          <button onClick={startConversation}>Start Conversation</button>

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
            <button onClick={sendMessage} style={{ padding: "10px" }}>Send</button>
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
