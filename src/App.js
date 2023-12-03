import React, { useEffect, useState } from 'react'
import logo from './logo.svg';
import './App.css';
import { capitalizeFirstLetter, getColor } from './utils'
import { Button } from '@mui/material'


function App() {
  const [loading, setLoading] = useState(true)
  const [lastSelectedCity, setLastSelectedCity] = useState('user location')
  const [cities, setCities] = useState({
    tokyo: {},
    perth: {},
    budapest: {},
    'user location': {}
  })
  const [initialLoad, setInitialLoad] = useState(true)
  const [resetTriggered, setResetTriggered] = useState(false)
  const config = require('./config')
  const apiToken = config.apiToken



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
        <img src={logo} className="App-logo" alt="logo" />
        <h1>AQI Location Viewer</h1>
        {console.log(!lastSelectedCity)}
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
        <h1 className="text-3xl font-bold underline">
          Hello world!
        </h1>
        <div className="flex flex-col sm:flex-row">
          <Button onClick={() => fetchData('user location')} variant="contained" className="mb-2 sm:mr-2 sm:mb-0">
            My Location
          </Button>
          <Button onClick={() => fetchData('tokyo')} variant="contained" className="mb-2 sm:mr-2 sm:mb-0">
            Tokyo
          </Button>
          <Button onClick={() => fetchData('budapest')} variant="contained" className="mb-2 sm:mr-2 sm:mb-0">
            Budapest
          </Button>
          <Button onClick={() => fetchData('perth')} variant="contained" className="mb-2 sm:mr-2 sm:mb-0">
            Perth
          </Button>
          <Button onClick={() => resetCities()} variant="contained" className="mb-2 sm:mb-0">
            Reload
          </Button>
        </div>
      </header>
    </div>
  )
}

export default App