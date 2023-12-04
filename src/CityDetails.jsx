import React from 'react'
import PropTypes from 'prop-types'
import CircleIcon from '@mui/icons-material/Circle'
import { Box, Paper, Typography } from '@mui/material'
import { formatISOTime } from './utils'


function CityDetails({capitalizeFirstLetter, cities, lastSelectedCity, loading}) {

  return (
    <Paper 
      sx={{ 
        margin: '2rem 1rem',
        minHeight: 200,
        minWidth: 375,
        padding: '1.5rem'
      }}
      variant="elevation"
    >
      {loading || !lastSelectedCity ? (
      <Typography variant="body1">Loading...</Typography>
      ) : (
        <>
          {cities[lastSelectedCity].data && (
            <>
              {lastSelectedCity === 'user location' ? (
                <Typography component="h2" variant="h4">{cities[lastSelectedCity].data.city.name}</Typography>
              ) : (
                <Typography component="h2" variant="h4">{capitalizeFirstLetter(lastSelectedCity)}</Typography>                    
              )}
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
                    sx={{color: cities[lastSelectedCity].color}}
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

export default CityDetails