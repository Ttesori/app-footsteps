import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import { DataProvider } from './context/DataContext';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <DataProvider>
        <App />
      </DataProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
