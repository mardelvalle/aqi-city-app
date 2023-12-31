import React, { useCallback, useEffect, useState } from 'react'
import { Box, FormControlLabel, Stack, Switch, Typography, useMediaQuery, useTheme } from '@mui/material'
import AQITable from './AQITable'
import CityDetails from './CityDetails'
import Header from './Header'
import LocationButton from './LocationButton'
import ResetButton from './ResetButton'
import { getColorAndLevel } from '../utils'


function App() {
  const [cities, setCities] = useState({
    tokyo: {},
    perth: {},
    budapest: {},
    'my location': {}
  })
  const [loading, setLoading] = useState(true)
  const [lastSelectedCity, setLastSelectedCity] = useState('my location')
  const [initialLoad, setInitialLoad] = useState(true)
  const [resetTriggered, setResetTriggered] = useState(false)
  const [showAQITable, setAQITable] = useState(false)

  const config = require('../config')
  const apiToken = config.apiToken
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const fetchData = useCallback(async (city) => {
    if (!cities[city].data) {
      const apiUrl = city === 'my location'
      ? `https://api.waqi.info/feed/here/?token=${apiToken}`
      : `https://api.waqi.info/feed/${city}/?token=${apiToken}`

      setLastSelectedCity(city)
      setLoading(true)
      try {
        const response = await fetch(apiUrl)
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data = await response.json()
        const { color, level } = getColorAndLevel(data.data.aqi)
        setCities(prevState => ({
          ...prevState,
          [city]: { data: data.data, color, level }
        }))
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    } else if (cities[city].data) {
      setLastSelectedCity(city)
    }
  }, [apiToken, cities, setCities, setLoading, setLastSelectedCity])

  const handleToggle = (event) => {
    setAQITable(event.target.checked)
  }

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true)
        await fetchData(lastSelectedCity)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    if (initialLoad || resetTriggered) {
      fetchInitialData(lastSelectedCity)
      setInitialLoad(false)
      setResetTriggered(false)
    }
  }, [fetchData, initialLoad, resetTriggered, lastSelectedCity])

  return (
    <div className="App">
      <Header />
      <Box
        display="flex"
        alignItems="center"
        component="section"
        flexDirection="column" 
        justifyContent="center"
        px={2}
      >
        <CityDetails cities={cities} lastSelectedCity={lastSelectedCity} loading={loading}/>
        <Stack direction={isMobile ? 'column' : 'row'} spacing={2}>
          {['my location', 'tokyo', 'budapest', 'perth'].map((city) => (
            <LocationButton
              city={city}
              fetchData={fetchData}
              isMobile={isMobile}
              lastSelectedCity={lastSelectedCity}
              key={city}
              theme={theme}
            />
          ))}
          <ResetButton 
            cities={cities} 
            isMobile={isMobile} 
            setCities={setCities}
            setResetTriggered={setResetTriggered}
          />
        </Stack>
        <FormControlLabel
          control={
            <Switch 
              checked={showAQITable} 
              data-testid="aqi-scale-switch" 
              onChange={handleToggle} 
            />
          }
          data-testid="aqiToggle"
          label={
            <Typography variant="body2">
              Air Quality Index (AQI) Scale and Color Legend
            </Typography>
          }
        />
        {showAQITable && (
          <AQITable/>
        )}
      </Box>
    </div>
  )
}

export default App