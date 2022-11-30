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
  await CryptoStakeContractSigner.placeBet(gameID,choice,590,tx);
}
let testCryptoConnection = async ()=>{
  let x =  await CryptoStakeContract.getContractBalance();
  console.log(x);
};

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
  useEffect(()=>{//to make asynchronus remove from useEffect
    fetch(baseURL + "/games").then((response) => response.json())
    .then(async (data) => {
      setGames(data.games);
      // console.log(games)
      for (let i = 0; i < games.length; i++) {
      games[i]['homeStake']=await CryptoStakeContract.getBetInfo(games[i].gameID)//draw.amount._hex
      games[i]['drawStake']=await CryptoStakeContract.getBetInfo(games[i].gameID)//draw.amount._hex
      games[i]['awayStake']=await CryptoStakeContract.getBetInfo(data.games[i].gameID);//x.draw.amount._hex
      }
    })
    .catch((error) => console.log(error))
  },[])
  let hanndleAmount = event =>{
    amount = event.target.value;
    console.log(amount);
  }
  let getGame = async ()=>{
    let game = await CryptoStakeContract.getBetInfo("hello");//x.draw.amount._hex
    setGame(game);
    console.log(game.home.amount);
    console.log(game.draw.amount);
    console.log((game.away.amount._hex).toString());
    console.log(game.away.stakers);
  };
  

  return (
    <div>
      <h1>{message.test}</h1>
      <button onClick={(e)=>testCryptoConnection()}>Test Connection To Chain</button>
      <button onClick={(e)=>getGame()}>Get HEllo</button>
      <div className='games-list'>
          {
            games.map(
              i=>(
                <div className='game' key={i.gameID}>
                  <h3>{i.home}</h3>
                  <button onClick={(e)=>placeBet(i.gameID,1,e)}>1</button>
                  <button onClick={(e)=>placeBet(i.gameID,0,e)}>x</button>
                  <button onClick={(e)=>placeBet(i.gameID,2,e)}>2</button>
                  <h3>{i.away}</h3>
                  <h3>{i.time}</h3>
                  <p>ID: {i.gameID}</p>
                  <p>Home stakes {i.homeStake}</p>
                  <p>Draw stakes {i.awayStake}</p>
                  <p>Away stakes {i.drawStake}</p>
                  <label>
                  Your Stake ::
                  <input type="text" value={amount} onChange={hanndleAmount} />
                  </label>
                </div>
              )
            )
          }
        </div>
    </div>
  )
}

export default App
