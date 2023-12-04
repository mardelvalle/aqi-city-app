import {
  capitalizeFirstLetter,
  formatISOTime,
  getColor,
} from '../utils'

describe('capitalizeFirstLetter function', () => {
  test('capitalizes the first letter of a string', () => {
    const result = capitalizeFirstLetter('test')
    expect(result).toBe('Test')
  })

  test('handles an empty string', () => {
    const result = capitalizeFirstLetter('')
    expect(result).toBe('')
  })
})

describe('formatISOTime function', () => {
  test('formats ISO time correctly', () => {
    const isoTime = '2023-12-01T12:34:56Z'
    const result = formatISOTime(isoTime)
    expect(result).toBe('December 1, 2023 at 7:34:56 AM EST')
  })

  test('handles an invalid ISO time', () => {
    const isoTime = 'invalid'
    const result = formatISOTime(isoTime)
    expect(result).toBe('Invalid Date')
  })

})

describe('getColor function', () => {
  test('returns correct color and level for AQI range 0-50', () => {
    const result = getColor(25)
    expect(result).toEqual({ aqi: 25, color: 'green', level: 'Good' })
  })

  test('returns correct color and level for AQI range 51-100', () => {
    const result = getColor(75)
    expect(result).toEqual({ aqi: 75, color: 'yellow', level: 'Moderate' })
  })

  test('returns correct color and level for AQI range 101-150', () => {
    const result = getColor(125)
    expect(result).toEqual({ aqi: 125, color: 'orange', level: 'Unhealthy for Sensative Groups' })
  })


  test('returns default values for invalid AQI', () => {
    const result = getColor(-1)
    expect(result).toEqual({ color: 'brown', level: 'Hazardous' })
  })

})
