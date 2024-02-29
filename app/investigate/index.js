import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import store from './store';
import { Provider } from 'react-redux';
import { PrimeReactProvider } from 'primereact/api';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PrimeReactProvider>
        <App />
      </PrimeReactProvider>
    </Provider>
  </React.StrictMode>
);