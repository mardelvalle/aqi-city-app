import React from 'react'
import { Button } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh';


function ResetButton({cities, isMobile, setCities, setResetTriggered}) {

  const resetCities = async () => {
    Object.keys(cities).forEach((city) => {
      setCities((prevState) => ({
        ...prevState,
        [city]: {},
      }))
    })

    setResetTriggered(true)
  }

  return (
    <Button 
      onClick={() => resetCities(setCities, setResetTriggered)} 
      sx={{ 
        backgroundColor: 'inherit', 
        fontSize: isMobile ? '1.5rem' : 'inherit', 
        padding: isMobile ? '0.75rem 7.5rem' : '0.5rem', 
        color: 'inherit',
        '&:hover': {
          color: 'white',
        } 
      }} 
      variant="contained"
    >
      Reload
      <RefreshIcon style={{ marginRight: 4 }} />
    </Button>
  )
}

export default ResetButton