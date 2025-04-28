import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  Provider,
  defaultTheme
} from '@adobe/react-spectrum';

const colorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider theme={defaultTheme} colorScheme={colorScheme}>
      <App />
    </Provider>
  </React.StrictMode>
);