import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { HashRouter } from 'react-router-dom'
import './styles/index.css'

const root = createRoot(document.getElementById('root')!)

root.render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>
)

window.removeLoading()
