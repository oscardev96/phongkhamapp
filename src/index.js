// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';
import {BrowserRouter} from "react-router-dom"
window.onload = () => {
    ReactDOM.render(<BrowserRouter>
    <App /></BrowserRouter>, document.getElementById('app'));
};
