import React, { createContext, useState, useEffect } from 'react'
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
  const [isGeolocation, setIsGeolocation] = useState(false)

  const fetchWeather = async () => {
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

  useEffect(() => {
    if (isGeolocation) {
      fetchWeather()
      setIsGeolocation(false)
    }
  }, [isGeolocation])

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
        isLoading,
        setIsLoading,
        error,
        setIsGeolocation,
      }}
    >
      {props.children}
    </WeatherContext.Provider>
  )
}

export { WeatherProviderWrapper, WeatherContext }
