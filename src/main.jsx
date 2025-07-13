/**
 * Entry point for the React app.
 * Renders the App component inside the root div, wrapped with React Router and StrictMode.
 */

import React from 'react'; 
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter} from "react-router-dom";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </StrictMode>,
)
