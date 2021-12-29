import React, { createContext, useState } from 'react'
import getWeather from './graphQLAPI'

const WeatherContext = createContext()
export default function WeatherProviderWrapper(props) {
  const [search, setSearch] = useState('')
  const [geolocation, setGeolocation] = useState(null)
  const [live, setLive] = useState(undefined)
  const [hourlyForecast, setHourlyForecast] = useState(undefined)
  const [weekForecast, setWeekForecast] = useState(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const fetchWeather = async (e) => {
    e.preventDefault()
    try {
      const { data } = await getWeather(geolocation, search)
      setLive(data?.data?.current)
      setHourlyForecast(data?.data?.hourly)
      setWeekForecast(data?.data?.daily)
      if (geolocation) setSearch(data?.data?.timezone?.split('/')[1]) // header name comes from search
      setError(false)
    } catch (err) {
      setError(true)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchGeolocation = (position) => setGeolocation(position)

  return (
    <WeatherContext.Provider
      value={{
        setSearch,
        search,
        fetchWeather,
        live,
        hourlyForecast,
        weekForecast,
        setGeolocation,
        geolocation,
        fetchGeolocation,
        isLoading,
        error,
      }}
    >
      {props.children}
    </WeatherContext.Provider>
  )
}

export { WeatherProviderWrapper, WeatherContext }
