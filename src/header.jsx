import './header.css'
import logo from './assets/logo.svg'
function Header() {

    return (
      <header>
        <img src={logo} alt="" srcSet="" />
        <h3 className='logo-text'>Crypto Stake</h3>
      </header>
    )
  }
  
export default Header