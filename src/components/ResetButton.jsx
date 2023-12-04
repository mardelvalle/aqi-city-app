import React from 'react'
import PropTypes from 'prop-types'
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
      data-testid='reload'
      onClick={() => resetCities()} 
      sx={{ 
        backgroundColor: 'inherit', 
        fontSize: isMobile ? '1.25rem' : 'inherit', 
        padding: isMobile ? '0.75rem 8.5rem' : '0.5rem', 
        color: 'inherit',
        '&:hover': {
          color: 'white',
        } 
      }} 
      variant="contained"
    >
      Reload
      <RefreshIcon data-testid='reload-icon' style={{ marginRight: 4 }} />
    </Button>
  )
}

ResetButton.propTypes = {
  cities: PropTypes.object.isRequired,
  isMobile: PropTypes.bool.isRequired,
  setCities: PropTypes.func.isRequired,
  setResetTriggered: PropTypes.func.isRequired,
}

export default ResetButton