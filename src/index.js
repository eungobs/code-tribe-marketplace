// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // This should work if App.js is in the same directory
import './styles/main.css'; // This should work if main.css is in the styles directory
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
