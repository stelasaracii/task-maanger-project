import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UsersProvider } from './store/UserProvider';


const rootElement = document.getElementById('root');
const root = rootElement instanceof Element ? ReactDOM.createRoot(rootElement) : null;

if (root) {
  root.render(
    <React.StrictMode>
      <UsersProvider>
      <App /></UsersProvider>
    </React.StrictMode>
  );
}
