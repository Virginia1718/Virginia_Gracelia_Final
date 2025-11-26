// src/main.jsx (Ganti dengan kode ini)

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // <-- IMPOR INI
import App from './App.jsx';
import './index.css'; 


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* ✅ PENTING: BUNGKUS APP DENGAN BROWSER ROUTER HANYA DI SINI */}
    <BrowserRouter> 
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);