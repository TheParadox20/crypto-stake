import { useState, useEffect } from 'react'
import {baseURL} from './data.json'
import './navBar.css'

function NavBar() {
  const [sports, setSports] = useState([]);
  useEffect(()=>{//to make asynchronus remove from useEffect
    fetch(baseURL + "/sports").then((response) => response.json())
    .then((data) => {
      setSports(data.sports);
    })
    .catch((error) => console.log(error))
  },[])
  return (
    <div>
        <h3>Sports list</h3>
        <div className='sports-list'>
          {
            sports.map(
              i=>(
                <div>{i}</div>
              )
            )
          }
        </div>
    </div>
  )
}

export default NavBar
