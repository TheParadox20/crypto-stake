import { baseURL } from "./data.json";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import {CryptoStakeContractSigner} from './contracts'
import './admin.css'

let placeBet = async (gameID,choice,stake,e)=>{
  console.log(gameID,stake,choice);
  e.preventDefault();
  await provider.send("eth_requestAccounts", []);
  
  let tx = {
    // gasLimit:300000,
    value:ethers.utils.parseEther((stake))
  }
  await CryptoStakeContractSigner.placeBet(gameID,parseInt(choice),tx);
}

function Admin(){
  const [games, setGames] = useState([]);
  const [searchQuery, setQuery] = useState([]);
  const [home, setHome] = useState([]);
  const [away, setAway] = useState([]);
  const [kickoff, setKickoff] = useState([]);
  const [betID, setBetID] = useState([]);
  const [alphaStake, setAlphaStake] = useState([]);

  useEffect(()=>{
    
  },[])
  fetch(baseURL + "/games").then((response) => response.json())
    .then(async (data) => {
      setGames(data.games);
    })
    .catch((error) => console.log(error))
  let handleSearch = event =>{
    setQuery(searchQuery);
  }

  let submitGame = (e,gameID,amount) =>{
    e.preventDefault();
    //alert('');
    let parameters = "?home="+home+"&away="+away+"&kickoff="+kickoff+"&betID="+betID;
    fetch(baseURL + "/addGame" + parameters).then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.log(error));
    let tx = {
      // gasLimit:300000,
      value:ethers.utils.parseEther((amount))
    };
    CryptoStakeContractSigner.addBet(gameID,tx);
  }
  let removeGame=(e,gameID)=>{
    e.preventDefault();
    fetch(baseURL + "/closeGame?gameID=" + gameID ).then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.log(error));
  }
  let closeGame=(event,gameID,choice) => {
    event.preventDefault();
    removeGame(event,gameID);
    CryptoStakeContractSigner.closeBet(gameID,parseInt(choice));
  }
  return(
    <>
      <h1>Admin Panel</h1>
      <div className="close-overlay"></div>
      <div className="control-panel">
        <div className="add-game">
          <h2>Add Game</h2>
          <form onSubmit={(e)=>{submitGame(e,betID,alphaStake)}}>
          <input type="text" value={home} className="input-search" onChange={event =>{setHome(event.target.value)}} placeholder="Home Team"/>
          <input type="text" value={away} className="input-search" onChange={event =>{setAway(event.target.value)}} placeholder="Away Team"/>
          <input type="text" value={kickoff} className="input-search" onChange={event =>{setKickoff(event.target.value)}} placeholder="Kickoff"/>
          <input type="text" value={betID} className="input-search" onChange={event =>{setBetID(event.target.value)}} placeholder="Game ID"/>
          <input type="text" value={alphaStake} className="input-search" onChange={event =>{setAlphaStake(event.target.value)}} placeholder="Starting Stakes"/>
          <button type="submit">Add Game</button>
          </form>
        </div>
        <div className="close-game">
          <h2>Close Game</h2>
          <input type="text" value={searchQuery} className="input-search" onChange={handleSearch} placeholder="Search"/>
          <table>
            <thead>
              <tr>
                <th>Game ID</th>
                <th>Home Team</th>
                <th>Away Team</th>
                <th>Balance</th>
                <th></th>
                <th></th>
              </tr>
              <tr>
              </tr>
            </thead>
            <tbody>
            {
            games.map(
              i=>(
                <tr key={i.gameID}>
                  <td>{i.gameID}</td>
                  <td>{i.home}</td>
                  <td>{i.away}</td>
                  <td>{0.00}</td>
                  <td><button onClick={(e)=>{removeGame(e,i.gameID)}}>Remove Game</button></td>
                  <td><button onClick={(e)=>{closeGame(e,i.gameID,2)}}>Close Game</button></td>
                </tr>
              )
            )
          }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
export default Admin