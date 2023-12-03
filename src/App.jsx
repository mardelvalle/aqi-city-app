import React, { useEffect, useState } from 'react'
import aqicn from './aqicn.png';
import './App.css';
import AQITable from './AQITable'
import { capitalizeFirstLetter, getColor } from './utils'
import { Box, Button, FormControlLabel, Stack, Switch, Typography, useMediaQuery, useTheme } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh';


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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const fetchData = async (city) => {
    if (!cities[city].data && city === 'user location') {
      setLoading(true)
      try {
        const response = await fetch(`https://api.waqi.info/feed/here/?token=${apiToken}`)
        const data = await response.json()
        const { color, level } = getColor(data.data.aqi)
        setCities(prevState => ({
          ...prevState,
          [city]: { data: data.data, color, level }
        }))
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLastSelectedCity(city)
        setLoading(false)
      }

    } else if (!cities[city].data) {
      try {
        setLoading(true)
        const response = await fetch(`https://api.waqi.info/feed/${city}/?token=${apiToken}`)
        const data = await response.json()

        const { color, level } = getColor(data.data.aqi)
        setCities(prevState => ({
          ...prevState,
          [city]: { data: data.data, color, level }
        }))
        console.log(city)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLastSelectedCity(city)
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

  const resetCities = async () => {
    console.log('fries')
    Object.keys(cities).forEach((city) => {
      setCities((prevState) => ({
        ...prevState,
        [city]: {},
      }))
    })

    setResetTriggered(true)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={aqicn} className="App-logo" alt="logo" />
        <h1>AQI Location Viewer</h1>
      </header>
      <Box
          display="flex"
          alignItems="center"
          component="section"
          flexDirection="column" 
          justifyContent="center"
          px={2}
        >
        {loading || !lastSelectedCity ? (
        <p>Loading...</p>
        ) : (
          <>
            {console.log(lastSelectedCity)}
            {console.log(cities)}
            <h2>{capitalizeFirstLetter(lastSelectedCity)}</h2>
            {
              <>
                <h3>{cities[lastSelectedCity].data ? cities[lastSelectedCity].data.aqi : null}</h3>
                <h3>{cities[lastSelectedCity].level ? cities[lastSelectedCity].level : null}</h3>
              </>
            }
          </>
        )}
        <Stack direction={isMobile ? 'column' : 'row'} spacing={2}>
          <Button onClick={() => fetchData('user location')} sx={{ fontSize: isMobile ? '1.5rem' : 'inherit', padding: isMobile ? '0.75rem 7.5rem' : '0.5rem' }} variant="contained">
            My Location
          </Button>
          <Button onClick={() => fetchData('tokyo')} sx={{ fontSize: isMobile ? '1.5rem' : 'inherit', padding: isMobile ? '0.75rem 7.5rem' : '0.5rem' }} variant="contained">
            Tokyo
          </Button>
          <Button onClick={() => fetchData('budapest')} sx={{ fontSize: isMobile ? '1.5rem' : 'inherit', padding: isMobile ? '0.75rem 7.5rem' : '0.5rem' }} variant="contained">
            Budapest
          </Button>
          <Button onClick={() => fetchData('perth')} sx={{ fontSize: isMobile ? '1.5rem' : 'inherit', padding: isMobile ? '0.75rem 7.5rem' : '0.5rem' }} variant="contained">
            Perth
          </Button>
          <Button onClick={() => resetCities()} sx={{ fontSize: isMobile ? '1.5rem' : 'inherit', padding: isMobile ? '0.75rem 7.5rem' : '0.5rem' }} variant="contained">
            Reload
            <RefreshIcon style={{ marginRight: 4 }} />
          </Button>
        </Stack>
        <FormControlLabel
          control={<Switch checked={showAQITable} onChange={handleToggle} />}
          label={<Typography variant="body2">Air Quality Index (AQI) Scale and Color Legend</Typography>}
        />
      </Box>
      {showAQITable && (
        <AQITable/>
      )}
    </div>
  )
}

export default App