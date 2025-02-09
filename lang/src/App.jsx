import logo from './logo.svg';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { useState } from 'react';
import './App.css';

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



  const sendMessage = async () => {
    if (!input) return;
  
    // Add the user message to the messages state
    setMessages([...messages, { role: "user", content: input }]);
  
    try {
      // Send the message to the backend server (make sure to use the correct backend URL)
      const response = await axios.post("http://localhost:4000/chat", {
        messages: [...messages, { role: "user", content: input }],
      });
  
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
                <NewRow className="tab" eng="Hello" span="Hola" source="url" />
                <NewRow className="tab" eng="Bye" span="Adios" source="url" />
              </tbody>
          </table>
        </div>
        <div className = "col-6">
          <h1>Chatbot</h1>
          <div className="chat-box">
            {messages.map((message, index) => (
              <div key={index} className={message.role}>
                <strong>{message.role}: </strong>{message.content}
              </div>
            ))}
          </div>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>Send</button>
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
