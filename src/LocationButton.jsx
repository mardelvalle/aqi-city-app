import React from 'react'
import { Button } from '@mui/material'


function LocationButton({capitalizeFirstLetter, city, fetchData, isMobile, lastSelectedCity, theme}) {

  return (
    <Button
        onClick={() => fetchData(city)}
        sx={{
        fontSize: isMobile ? '1.25rem' : 'inherit',
        padding: isMobile ? '0.75rem 8.5rem' : '0.5rem',
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