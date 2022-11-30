import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import NavBar from './navBar'
import Header from './header'
import Admin from './admin'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header/>
    <NavBar/>
    <App />
    <Admin/>
  </React.StrictMode>
)
