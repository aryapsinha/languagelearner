import logo from './logo.svg';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
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
          <h1>Hello</h1>
          <table className = "table table-bordered table-striped">
              <NewRow className="tab" eng="Hello" span="Hola" source="url" />
              <NewRow className="tab" eng="Bye" span="Adios" source="url" />
          </table>
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
