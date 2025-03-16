<<<<<<< HEAD
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/css/styles.css'
import App from './App.jsx'
=======
import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './assets/css/styles.css';
import './assets/css/App.css';
import App from './App.jsx';
>>>>>>> 5690f236fd94db8a1914a3181ff13e136601948d
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
