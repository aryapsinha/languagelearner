
import logo from './logo.svg';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { useState } from 'react';
import './App.css';
import { useEffect } from 'react';

function NewRow({eng, span, source}) {
  return (
      <tr>
          <td>
              {eng}
          </td>
          <td>
              {span}
          </td>
          <td>
              {source}
          </td>
      </tr>
  )
}
function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("");
  const [words, setWords] = useState("");
  const [savedTerms, setSavedTerms] = useState([]);
  
  useEffect(() => {
    // Load saved terms from localStorage if any
    const saved = localStorage.getItem('savedTerms');
    if (saved) {
      setSavedTerms(JSON.parse(saved)); // Parse and set state
    }

    // Listen for a custom event that signals saving a term
    const handleSaveTerm = (event) => {
      console.log("handling")
      const { selectedText, translatedText } = event.detail;

      // Save the new term into localStorage and state
      const newTerm = { selectedText, translatedText };
      setSavedTerms((prevTerms) => {
        const updatedTerms = [...prevTerms, newTerm];
        localStorage.setItem('savedTerms', JSON.stringify(updatedTerms)); // Update localStorage
        return updatedTerms; // Update state
      });
    };

    // Add event listener for 'saveTerm' event
    console.log("yoi")
    document.addEventListener('saveTerm', handleSaveTerm);

    // Cleanup the event listener when the component is unmounted
    return () => {
      document.removeEventListener('saveTerm', handleSaveTerm);
    };
  }, []);

  const startConversation = async () => {
    if (!language || !words) {
      alert("Please provide both language and vocabulary words.");
      return;
    }
    
    try {
      // Send language and words to the backend to initialize conversation
      const response = await axios.post("http://localhost:4000/start-conversation", {
        language: language,
        words: words,
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
                </tr>
              </thead>
              <tbody>
              {savedTerms.map((term, index) => (
                <NewRow
                  key={index}
                  eng={term.selectedText}
                  span={term.translatedText}
                  source="url" // Or change to dynamic source if needed
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
            <label>Vocabulary words (comma-separated): </label>
            <input
              type="text"
              placeholder="Enter vocabulary words"
              value={words}
              onChange={(e) => setWords(e.target.value)}
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
