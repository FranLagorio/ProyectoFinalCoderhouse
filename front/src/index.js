import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter } from 'react-router-dom'
import { CssBaseline } from '@mui/material'

import { AppTheme } from './theme'
import { UserComponentContext } from './context/UserComponentContext'
import './assets/scss/styles.scss'
import { App } from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <UserComponentContext>
    <BrowserRouter>
      <CssBaseline />
      <AppTheme>
        <App />
      </AppTheme>
    </BrowserRouter>
  </UserComponentContext>
  // </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
