import { useState, useEffect } from 'react'
import {baseURL} from './data.json'
import './navBar.css'

function NavBar() {
  const [sports, setSports] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const [countries, setCountries] = useState([]);
  useEffect(()=>{//to make asynchronus remove from useEffect
    fetch(baseURL + "/sports").then((response) => response.json())
    .then((data) => {
      setSports(data.sports);
      setLeagues(data.leagues);
      setCountries(data.countries);
    })
    .catch((error) => console.log(error))
  },[])
  return (
    <div>
        <h3>Sports</h3>
        <div className='sports-list'>
          {
            sports.map(
              i=>(
                <div className='navbar-button'> <img src="./test.png" alt="" srcSet="" /> {i}</div>
              )
            )
          }
        </div>
        <h3>Leagues</h3>
        <div className='sports-list'>
          {
            leagues.map(
              i=>(
                <div className='navbar-button'> <img src="./test.png" alt="" srcSet="" /> {i}</div>
              )
            )
          }
        </div><h3>Countries</h3>
        <div className='sports-list'>
          {
            countries.map(
              i=>(
                <div className='navbar-button'> <img src="./test.png" alt="" srcSet="" /> {i}</div>
              )
            )
          }
        </div>
    </div>
  )
}

export default NavBar
