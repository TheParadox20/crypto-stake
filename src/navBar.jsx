import { useState, useEffect } from 'react'
import './navBar.css'

function NavBar() {
  let baseURL='http://192.168.100.12:5000';
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
