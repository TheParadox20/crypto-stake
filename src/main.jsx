import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import NavBar from './navBar'
import Header from './header'
import Admin from './admin'
import SideBar from './sideBar'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <>
  <div className="main">
    <NavBar/>
      <div className="main-container">
        <Header/>
        <App />
      </div>
    <SideBar />
  </div>
  <Admin/>
  </>
  </React.StrictMode>
)
