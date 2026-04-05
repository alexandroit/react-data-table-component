import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './app.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found.');
}

createRoot(rootElement).render(
  <React.StrictMode>
    <App
      reactLine="19.2.4"
      packageLine="9.1.1"
      docsPath="react-19"
    />
  </React.StrictMode>
);
