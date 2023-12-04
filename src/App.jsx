import React, { useEffect, useState } from 'react'
import './App.css'
import AQITable from './AQITable'
import CityDetails from './CityDetails'
import Header from './Header'
import LocationButton from './LocationButton'
import ResetButton from './ResetButton'
import { capitalizeFirstLetter, getColor } from './utils'
import { Box, FormControlLabel, Stack, Switch, Typography, useMediaQuery, useTheme } from '@mui/material'


function App() {
  const [cities, setCities] = useState({
    tokyo: {},
    perth: {},
    budapest: {},
    'user location': {}
  })
  const [loading, setLoading] = useState(true)
  const [lastSelectedCity, setLastSelectedCity] = useState('user location')
  const [initialLoad, setInitialLoad] = useState(true)
  const [resetTriggered, setResetTriggered] = useState(false)
  const [showAQITable, setAQITable] = useState(false)
  const config = require('./config')
  const apiToken = config.apiToken
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const fetchData = async (city) => {
    if (!cities[city].data) {
      setLastSelectedCity(city)
      setLoading(true)
      try {
        const response = city === 'user location' ? await fetch(`https://api.waqi.info/feed/here/?token=${apiToken}`) : await fetch(`https://api.waqi.info/feed/${city}/?token=${apiToken}`)
        const data = await response.json()
        const { color, level } = getColor(data.data.aqi)
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
  }

  const handleToggle = (event) => {
    setAQITable(event.target.checked)
  }

  useEffect(() => {
    console.log('asdf')
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
  }, [initialLoad, resetTriggered])

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
        <CityDetails capitalizeFirstLetter={capitalizeFirstLetter} cities={cities} lastSelectedCity={lastSelectedCity} loading={loading}/>
        <Stack direction={isMobile ? 'column' : 'row'} spacing={2}>
          {['user location', 'tokyo', 'budapest', 'perth'].map((city) => (
            <LocationButton
              capitalizeFirstLetter={capitalizeFirstLetter}
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
          control={<Switch checked={showAQITable} onChange={handleToggle} />}
          label={<Typography variant="body2">Air Quality Index (AQI) Scale and Color Legend</Typography>}
        />
        {showAQITable && (
          <AQITable/>
        )}
      </Box>
    </div>
  )
}

export default App