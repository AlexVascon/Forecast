import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://api.openweathermap.org/data/2.5'
})

export const fetchLatitudeAndLongitude = (location) => {
  return instance.get(`/weather?q=${location}&units=metric&appid=${process.env.API_KEY}`)
}

export const fetchWeather = (latitude,longitude) => {
  return instance.get(`onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.API_KEY}`)
}
