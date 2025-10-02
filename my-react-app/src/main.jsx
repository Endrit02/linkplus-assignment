import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import Home from './screens/Home.jsx'
import User from './screens/User.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:id" element={<User />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
