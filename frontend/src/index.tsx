import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store/index';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AlertProvider from './contexts/alert/AlertProvider';
import './index.css';

const container: HTMLElement | null = document.getElementById('root');
if (container != null) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <AlertProvider>
            <App />
          </AlertProvider>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
}

reportWebVitals();
