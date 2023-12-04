import React from 'react'
import PropTypes from 'prop-types'
import CircleIcon from '@mui/icons-material/Circle'
import { Box, Paper, Typography } from '@mui/material'
import { capitalizeFirstLetter } from '../utils'
import { formatISOTime } from '../utils'


function CityDetails({cities, lastSelectedCity, loading}) {

  const cityName = () => lastSelectedCity === 'my location' ? cities[lastSelectedCity].data.city.name : capitalizeFirstLetter(lastSelectedCity)

  return (
    <Paper
      data-testid="city-details" 
      sx={{ 
        margin: '2rem 1rem',
        minHeight: 200,
        minWidth: 375,
        padding: '1.5rem'
      }}
      variant="elevation"
    >
      {loading || !lastSelectedCity ? (
        <Typography data-testid="loading" variant="body1">Loading</Typography>
      ) : (
        <>
          {cities[lastSelectedCity].data && (
            <>
              <Typography component="h2" data-testid="city-name" variant="h4">{cityName()}</Typography>                    
              <Box sx={{ marginY: '1rem' }}>
                <Typography 
                  component="h3" 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    justifyContent: 'center' 
                  }}
                  variant="h5"
                >
                  {`AQI - ${cities[lastSelectedCity].data.aqi}`}
                  <CircleIcon 
                    aria-label={`Air Pollution Color Code: ${cities[lastSelectedCity].color}`} 
                    sx={{ color: cities[lastSelectedCity].color }}
                  />
                </Typography>
                <Typography component="h3" variant="h5">{`Air Pollution Level - ${cities[lastSelectedCity].level}`}</Typography>
                <Typography variant="body1">{formatISOTime(cities[lastSelectedCity].data.time.iso)}</Typography>
              </Box>
            </>          
          )}
        </>
      )}
    </Paper>
  )
}

CityDetails.propTypes = {
  cities: PropTypes.object.isRequired,
  lastSelectedCity: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default CityDetails