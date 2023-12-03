export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

export const getColor = (number) => {
    if (number >= 0 && number <= 50) {
        return { aqi: number, color: 'green', level: 'Good' }
    } else if (number >= 51 && number <= 100) {
        return { aqi: number, color: 'yellow', level: 'Moderate' }
    } else if (number >= 101 && number <= 150) {
        return { aqi: number, color: 'orange', level: 'Unhealthy for Sensative Groups' }
    } else if (number >= 151 && number <= 200) {
        return { aqi: number, color: 'red', level: 'Unhealthy' }
    } else if (number >= 201 && number <= 300) {
        return { aqi: number, color: 'purple', level: 'Very Unhealthy' }
    } else {
        return { color: 'brown', level: 'Hazardous' }
    }
}
