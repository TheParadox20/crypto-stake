import { useState, useEffect } from 'react'
import './App.css'

function placeBet(gameID,choice,e){
  e.preventDefault();
  console.log(gameID);
  console.log(choice);
}
function App() {
  let baseURL='http://192.168.100.12:5000';
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
      <div className='games-list'>
          {
            games.map(
              i=>(
                <div className='game'>
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
