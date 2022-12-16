import React  from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import NavBar from './navBar'
import Header from './header'
import Admin from './admin'
import SideBar from './sideBar'
import Games from './games'
import Dashboard from './dashboard'
import Bets from './bets'
import {CryptoStakeContract} from './contracts'
import './index.css'

let getContractOwner = async ()=>{
  let owner =  await CryptoStakeContract.owner;
  console.log(owner);
};
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.Fragment>
          <BrowserRouter>
          <Header/>
          <div className="main-container">
            <NavBar/>
            <div className='center-content'>
              <Routes>
                <Route path='/' element={<Dashboard/>}/>
                <Route path='bets' element={<Bets/>}/>
                <Route path='/games'>
                    <Route index element={<Dashboard/>}/>
                    <Route path=':id' element={<Games/>}/>
                    <Route path=':category/:id' element={<Games/>}/>
                </Route>
                <Route path='/admin' element={<Admin/>}/>
              </Routes>
            </div>
            </div>
          </BrowserRouter>
          <SideBar />
  </React.Fragment>
)
