import React from 'react'
import { Typography } from '@mui/material'
import aqicn from './aqicn.png'

function Header() {

  return (
    <header className="App-header" spacing={3}>
      <img src={aqicn} className="App-logo" alt="logo" />
      <Typography component="h1" variant="h3">City AQI App</Typography>
    </header>
  )
}

export default Header