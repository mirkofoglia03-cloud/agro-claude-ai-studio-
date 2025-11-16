import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const rootElement: HTMLElement | null = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found. Make sure there is a div with id="root" in index.html');
}

const root: ReactDOM.Root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
