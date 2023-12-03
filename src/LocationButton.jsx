import React from 'react'
import { Button } from '@mui/material'


function LocationButton({capitalizeFirstLetter, city, fetchData, isMobile, lastSelectedCity, theme}) {

  return (
    <Button
        key={city}
        onClick={() => fetchData(city)}
        sx={{
        fontSize: isMobile ? '1.5rem' : 'inherit',
        padding: isMobile ? '0.75rem 7.5rem' : '0.5rem',
        backgroundColor:
            lastSelectedCity === city ? theme.palette.primary.main : 'inherit',
        color: lastSelectedCity === city ? 'white' : 'inherit',
        '&:hover': {
            color: 'white',
        }
        }}
        variant="contained"
    >
        {capitalizeFirstLetter(city)}
    </Button>
  )
}

export default LocationButton