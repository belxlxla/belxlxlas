import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/index';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

export function setCookie(name, value) {
  document.cookie = `${name}=${value}; SameSite=Lax; path=/`;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

reportWebVitals();