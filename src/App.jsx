import { useState, useEffect } from 'react'
import { ethers } from "ethers";
import {baseURL,CONTRACT_ADDRESS,abi} from './data.json'
import './App.css'

const provider = new ethers.providers.Web3Provider(window.ethereum)
let connectWallet = async ()=>{
  await provider.send("eth_requestAccounts", []);
}
const signer = provider.getSigner()
let CryptoStakeContract = new ethers.Contract(CONTRACT_ADDRESS,abi,provider);
let CryptoStakeContractSigner = CryptoStakeContract.connect(signer);

//
let stakes = {};
//

let placeBet = async (gameID,choice,e)=>{
  e.preventDefault();
  await CryptoStakeContractSigner.placeBet(gameID,choice,590);
}
let testCryptoConnection = async ()=>{
  let x =  await CryptoStakeContract.getUserBalance();
  console.log(x);
};
function App() {
  const [message, setMessage] = useState({});
  useEffect(()=>{
    fetch(baseURL + "/test").then((response) => response.json())
    .then((data) => {
      setMessage(data);
      console.log('\n'+baseURL + "/sports\n")
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
  

  return (
    <div>
      <h1>{message.test}</h1>
      <button onClick={(e)=>testCryptoConnection()}>Test Crytpo Connection</button>
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
                  <p>Home stakes {console.log(i.homeStake)}</p>
                  <p>Draw stakes {i.awayStake}</p>
                  <p>Away stakes {i.drawStake}</p>
                </div>
              )
            )
          }
        </div>
    </div>
  )
}

export default App
