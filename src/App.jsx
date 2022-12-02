import { useState, useEffect } from 'react'
import { ethers } from "ethers";
import {baseURL} from './data.json'
import './App.css'
import {CryptoStakeContract,CryptoStakeContractSigner,provider} from './contracts'

//
let amount;
let searchQuery;
//


let placeBet = async (gameID,choice,e)=>{
  e.preventDefault();
  await provider.send("eth_requestAccounts", []);
  
  let tx = {
    // gasLimit:100000,
    value:ethers.utils.parseEther(amount)
  }
  await CryptoStakeContractSigner.placeBet(gameID,choice,tx);
}

function App() {
  const [message, setMessage] = useState({});
  const [game, setGame] = useState({});


  useEffect(()=>{
    fetch(baseURL + "/test").then((response) => response.json())
    .then((data) => {
      setMessage(data);
    })
    .catch((error) => console.log(error))
  }, [])

  const [games, setGames] = useState([]);
  useEffect(()=>{//to make fetch asynchronus remove from useEffect
    
  },[])
  fetch(baseURL + "/games").then((response) => response.json())
    .then(async (data) => {
      setGames(data.games);
      // console.log(games)
    })
    .catch((error) => console.log(error))
  
  let handleAmount = event =>{
    amount = event.target.value;
    console.log(amount);
  };
  let handleSearch = event =>{
    searchQuery = event.target.value;
  }
  let [balance,setBalance] = useState({});
  let getContractBalance = async ()=>{
    setBalance( await CryptoStakeContract.getContractBalance());
    console.log(balance);
  };

  return (
    <div className='middle'>
      <div className="matches-table">
        {/* <button onClick={(e)=>steal()}>Loot Contract</button> */}
        <div className="matches-title">
          <p>Football Game</p>
        </div>

        <div className="matches-buttons">
          <button>TODAY</button>
          <button>ALL MATCHES</button>
          <input type="text" value={searchQuery} className="input-search" onChange={handleSearch} placeholder="Search"/>
          <button onClick={(e)=> {getContractBalance()}}>Get contract balance</button>
          <span style={{color:'black'}}>{parseInt(balance._hex,16)} wei</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>DATE</th>
              <th>LOGO</th>
              <th>TEAMS</th>
              <th>1</th>
              <th>X</th>
              <th>2</th>
              <th>STAKES</th>
              <th>POT</th>
            </tr>
          </thead>
          <tbody>
            {
              games.map(
                i=>(
                  <tr className='game' key={i.gameID}>
                    <td>
                    {i.time}
                    </td>
                    <td className='matches-table-logo'>
                      <img style={{display:"block"}} src="./test.png" alt="H_logo" srcSet="" />
                      <img style={{display:"block"}} src="./test.png" alt="H_logo" srcSet="" />
                    </td>
                    <td>
                      <div>{i.home}</div>
                      <div>{i.away}</div>
                    </td>
                    <td><button onClick={(e)=>placeBet(i.gameID,1,e)}>0.00</button></td>
                    <td><button onClick={(e)=> { placeBet(i.gameID,0,e)}}>0.00</button></td>
                    <td><button onClick={(e)=> { placeBet(i.gameID,2,e)}}>0.00</button></td>
                    <td>0.0</td>
                    <td>
                      <label>
                      Your Stake :: <input type="text" value={amount} onChange={handleAmount} />
                      </label>
                    </td>
                  </tr>
                )
              )
            }

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App
