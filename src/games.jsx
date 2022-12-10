import { useState, useEffect } from 'react'
import {baseURL} from './data.json'
import Game from './game'
import './games.css'

//
let searchQuery;
//

function Games() {
  const [games, setGames] = useState([]);


  useEffect(()=>{//to make fetch asynchronus remove from useEffect
    fetch(baseURL + "/games").then((response) => response.json())
    .then(async (data) => {
      setGames(data.games);
      // console.log(games)
    })
    .catch((error) => console.log(error))
  },[])
  
  
  
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
        
            {
              games.map(
                i=>(
                  <Game key={i.gameID} gameID={i.gameID} time={i.time} home={i.home} away={i.away}/>
                )
              )
            }

      </div>
    </div>
  )
}

export default Games
