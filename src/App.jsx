import { useState, useEffect } from 'react'
import { ethers } from "ethers";
import {baseURL} from './data.json'
import './App.css'
import {CryptoStakeContract,CryptoStakeContractSigner,provider} from './contracts'

//
let stakes = {};
let amount;
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
let testCryptoConnection = async ()=>{
  let x =  await CryptoStakeContract.getContractBalance();
  console.log(x);
};

function App() {
  const [message, setMessage] = useState({});
  const [game, setGame] = useState({});
  const  [selected, setSelected] = useState(false); 


  useEffect(()=>{
    fetch(baseURL + "/test").then((response) => response.json())
    .then((data) => {
      setMessage(data);
    })
    .catch((error) => console.log(error))
  }, [])

  const [games, setGames] = useState([]);
  useEffect(()=>{//to make asynchronus remove from useEffect
    fetch(baseURL + "/games").then((response) => response.json())
    .then(async (data) => {
      setGames(data.games);
      // console.log(games)
    })
    .catch((error) => console.log(error))
  },[])
  let hanndleAmount = event =>{
    amount = event.target.value;
    console.log(amount);
  }
  let getGame = async (gameID,choice)=>{
    let game = await CryptoStakeContract.getBetInfo("hello");//x.draw.amount._hex
    setGame(game);
    console.log(game.away.stakers);
    switch (choice) {
      case 1:
        return game.home.amount._hex;
      case 0:
        return game.draw.amount._hex;
      case 2:
        return game.away.amount._hex;
    }
  };
  

  return (
    <div className="matches-table">
      {/* <button onClick={(e)=>steal()}>Loot Contract</button> */}
      <div className="matches-title">
        <p>Football Game</p>
      </div>

      <div className="matches-buttons">
        <button>TODAY</button>
        <button>ALL MATCHES</button>
        <input type="text" value={amount} className="input-search" onChange={hanndleAmount} placeholder="Search"/>
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
                  <td><button onClick={(e)=> { placeBet(i.gameID,0,e); setSelected(current => !current) }}>0.00</button></td>
                  <td><button onClick={(e)=> { placeBet(i.gameID,2,e); setSelected(current => !current) }}>0.00</button></td>
                  <td>0.0</td>
                  <td>
                    <label>
                    Your Stake ::
                    {
                      selected && (
                        <input type="text" value={amount} onChange={hanndleAmount} />
                      )
                    }
                    </label>
                  </td>
                </tr>
              )
            )
          }

        </tbody>
      </table>
    </div>
  )
}

export default App
