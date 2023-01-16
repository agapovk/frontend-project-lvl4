// eslint-disable-next-line import/order
import './wdyr';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './app/store';
import { DataProvider } from './context/DataContext';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import init from './init.js';

init();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <DataProvider>
          <App />
        </DataProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
