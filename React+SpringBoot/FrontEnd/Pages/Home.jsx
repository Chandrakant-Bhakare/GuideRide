import React from 'react'
import {Link} from 'react-router-dom'
const Home = () => {
  return (
    <div>
      <Link to="/BookCar" >Book Car</Link>
      <Link to="/Bookguide" >Book Guide</Link>
      <Link to="/BookTrip" >Book Tour</Link>
    </div>
  )
}

export default Home

