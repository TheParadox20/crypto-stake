import React  from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import NavBar from './navBar'
import Header from './header'
import Admin from './admin'
import SideBar from './sideBar'
import {CryptoStakeContract} from './contracts'
import './index.css'

let getContractBalance = async ()=>{
  let balance =  await CryptoStakeContract.getContractBalance();
  console.log(balance);
};
let getContractOwner = async ()=>{
  let owner =  await CryptoStakeContract.owner;
  console.log(owner);
};
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.Fragment>
    <Header/>
        <div className="main-container">
          <NavBar/>
          <App />
          <SideBar />
        </div>
    <Admin/>
  </React.Fragment>
)
