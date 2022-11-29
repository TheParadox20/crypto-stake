import { useState, useEffect } from 'react'
import { ethers } from "ethers";
import {baseURL,CONTRACT_ADDRESS,abi} from './data.json'
import './App.css'

const provider = new ethers.providers.Web3Provider(window.ethereum)
await provider.send("eth_requestAccounts", []);
const signer = provider.getSigner()
let CryptoStakeContract = new ethers.Contract(CONTRACT_ADDRESS,abi,provider);
let CryptoStakeContractSigner = CryptoStakeContract.connect(signer);

let placeBet = async (gameID,choice,e)=>{
  e.preventDefault();
  await CryptoStakeContractSigner.placeBet(gameID,choice,590);
}
let testCryptoConnection = async ()=>{
  let x=await CryptoStakeContract.getUserBalance();
  console.log(x);
};
function App() {
  const [message, setMessage] = useState({});
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
    .then((data) => {
      setGames(data.games);
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
                </div>
              )
            )
          }
        </div>
    </div>
  )
}

export default App
