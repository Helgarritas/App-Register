import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import '../app/globals.css'

document.documentElement.classList.add('dark');


createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <App/>
    </StrictMode>
  </BrowserRouter>
)
