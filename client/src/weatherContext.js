import React, { createContext, useState } from 'react'
import getWeather from './graphQLAPI'

const WeatherContext = createContext()
export default function WeatherProviderWrapper(props) {
  const [search, setSearch] = useState('')
  const [geolocation, setGeolocation] = useState(null)
  const [live, setLive] = useState(undefined)
  const [hourlyForecast, setHourlyForecast] = useState(undefined)
  const [week, setWeek] = useState(undefined)
  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const fetchWeather = async (e) => {
    e.preventDefault()
    try {
      const { data } = await getWeather(geolocation, search)
      setLive(data?.data?.current)
      setHourlyForecast(data?.data?.hourly)
      setWeek(data?.data?.daily)
      if (geolocation) setSearch(data?.data?.timezone?.split('/')[1]) // header name comes from search
      setError(false)
    } catch (err) {
      setError(true)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchGeolocation = (position) => setGeolocation(position)
  

  const determinePageIndex = (elementIdTag) => {
    if(elementIdTag === 'live') return 1
    if(elementIdTag === 'hourly-forecast') return 2
    if(elementIdTag === 'week-forecast') return 3
    return 0
  }
  const appContainer = document.getElementById('app')
  let timer = null

  if (appContainer) { // each child element (view) of appContainer has a unique id
    appContainer.addEventListener('scroll', () => {
      clearTimeout(timer)
      timer = setTimeout(() => { // waits for movement to stop before calculating
        [].slice.call(appContainer?.children).forEach((child) => { // some black magic empty array contains secrets
          if ( // calculates screen movement
            Math.abs(
              child.getBoundingClientRect().left -
              appContainer?.getBoundingClientRect().left
            ) < 10
          ) {
            setPage(determinePageIndex(child.id))
          }
        })
      }, 100)
    })
  }

  return (
    <WeatherContext.Provider
      value={{
        setSearch,
        search,
        fetchWeather,
        setPage,
        page,
        live,
        hourlyForecast,
        week,
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
