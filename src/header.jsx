import './header.css'
import {Link} from 'react-router-dom'
import logo from './assets/logo.svg'
import ask from './assets/ask.png'
import exchange from './assets/exchange.png'
import setting from './assets/setting.png'
import Countdown from './countdown'
function Header() {

    return (
      <header>
        <Link to='/'><img id='logo' src={logo} alt="" srcSet="" /><h3 className='logo-text'>Crypto Stake</h3></Link>
        <Countdown target="Dec 18, 2022 18:00:00" event="WORLDCUP FINAL"/>
        <div className='nav-items-links'>
          <Link to=''><img src={ask} alt="" srcset="" /></Link>
          <Link to=''><img src={exchange} alt="" srcset="" /></Link>
          <Link to=''><img src={setting} alt="" srcset="" /></Link>
          <Link to='' className="log-in">LOG IN</Link>
          <Link to='' className="create-account">CREATE ACCOUNT</Link>
        </div>
      </header>
    )
  }
  
export default Header