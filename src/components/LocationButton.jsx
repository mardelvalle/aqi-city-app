import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@mui/material'
import { capitalizeFirstLetter } from '../utils'

function LocationButton({city, fetchData, isMobile, lastSelectedCity, theme}) {

  return (
    <Button
      data-testid={city.replace(/\s/g, '')}
      onClick={() => fetchData(city)}
      sx={{
        fontSize: isMobile ? '1.25rem' : 'inherit',
        padding: isMobile ? '0.75rem 8.5rem' : '0.5rem',
        backgroundColor: lastSelectedCity === city ? theme.palette.primary.main : 'inherit',
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

LocationButton.propTypes = {
  city: PropTypes.string.isRequired,
  fetchData: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
  lastSelectedCity: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired
}

export default LocationButton