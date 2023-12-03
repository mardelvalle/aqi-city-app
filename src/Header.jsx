import React from 'react'
import aqicn from './aqicn.png';


function Header() {

  return (
    <header className="App-header">
      <img src={aqicn} className="App-logo" alt="logo" />
      <h1>AQI Location Viewer</h1>
    </header>
  )
}

export default Header