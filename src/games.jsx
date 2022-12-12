import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {baseURL} from './data.json'
import Game from './game'
import './games.css'

//
let searchQuery;
//

function Games() {
  const [games, setGames] = useState([]);
  let {id} = useParams();


  useEffect(()=>{//to make fetch asynchronus remove from useEffect
    
  },[])
  
  fetch(baseURL + "/games").then((response) => response.json())
    .then(async (data) => {
      setGames(data.games);
      // console.log(games)
    })
    .catch((error) => console.log(error))
  
  let handleSearch = event =>{
    searchQuery = event.target.value;
  }

let convertionRate;
let url = "https://exchange-rates.abstractapi.com/v1/live/?api_key=cfd9b06ce50b4e21b9bd707702860b03&base=EUR&target=ETH"
let xmlHttp = new XMLHttpRequest();
xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
    convertionRate = JSON.parse(xmlHttp.response).exchange_rates.ETH;
};
xmlHttp.open("GET", url, false); // true for asynchronous
xmlHttp.send(null);

  return (
    <div className='middle'>
        <div className="matches-title">
          <p>{id} Games</p>
        </div>

        <div className="matches-buttons">
          <button>TODAY</button>
          <button>ALL MATCHES</button>
          <input type="text" value={searchQuery} className="input-search" onChange={handleSearch} placeholder="Search"/>
        </div>
        
            {
              games.map(
                i=>(
                  <Game key={i.gameID} gameID={i.gameID} time={i.time} home={i.home} away={i.away} convertionRate={convertionRate}/>
                )
              )
            }
    </div>
  )
}

export default Games
