import { getColorAndLevel } from './utils'

const config = require('./config')
const apiToken = config.apiToken

const fetchData = async (cities, city, setCities, setLoading, setLastSelectedCity) => {
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
}

export default fetchData