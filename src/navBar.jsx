import { useState, useEffect } from 'react'
import {Link,Routes,Route} from 'react-router-dom'
import {baseURL} from './data.json'
import Games from './games'
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
    <div className='NavBar'>
        <h3>Sports</h3>
        <div className='sports-list'>
          {
            sports.map(
              i=>(
                <Link className='navbar-button' to={'/games/'+i}> <img src="./test.png" alt="" srcSet="" /> {i}</Link>
              )
            )
          }
        </div>
        <h3>Leagues</h3>
        <div className='sports-list'>
          {
            leagues.map(
              i=>(
                <Link className='navbar-button' to={'/games/leagues/'+i}> <img src="./test.png" alt="" srcSet="" /> {i}</Link>
              )
            )
          }
        </div>
        <h3>Countries</h3>
        <div className='sports-list'>
          {
            countries.map(
              i=>(
                <Link className='navbar-button' to={'/games/countries/'+i}> <img src="./test.png" alt="" srcSet="" /> {i}</Link>
              )
            )
          }
        </div>
        <h3>Extras</h3>
        <Link className='navbar-button'>Create Event</Link>
        <Link className='navbar-button' to='/admin'>Admin Panel</Link>
    </div>
  )
}

export default NavBar
