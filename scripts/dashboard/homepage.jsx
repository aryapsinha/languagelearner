
import React from 'react';
import ReactDOM from 'react-dom/client';
import useState from 'react';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

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

}