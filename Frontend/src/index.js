import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { LoggedInProvider } from './LoginContext'; 
import './index.css'// Path to your LoginContext.js

ReactDOM.render(
  <React.StrictMode>
    <LoggedInProvider>
      <App />
    </LoggedInProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
