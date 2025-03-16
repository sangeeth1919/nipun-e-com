// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Use the 'react-dom/client' import
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';

// Create a root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app using createRoot
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
