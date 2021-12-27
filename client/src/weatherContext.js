import React, { createContext, useState } from 'react'
import getWeather from './graphQLAPI'

const WeatherContext = createContext()
export default function WeatherProviderWrapper(props) {
  const [search, setSearch] = useState('')
  const [geolocation, setGeolocation] = useState(null)
  const [live, setLive] = useState(undefined)
  const [forecast, setForecast] = useState(undefined)
  const [week, setWeek] = useState(undefined)
  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const fetchWeather = async (e) => {
    e.preventDefault()
    try {
      const { data } = await getWeather(geolocation, search)
      setLive(data?.data?.current)
      setForecast(data?.data?.hourly)
      setWeek(data?.data?.daily)
      if (geolocation) setSearch(data?.data?.timezone?.split('/')[1]) // header name comes from search
      setError(false)
    } catch (err) {
      setError(true)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchGeolocation = (position) => {
    console.log('here:', position)
    setGeolocation(position)
  }

  const container = document.getElementById('app')
  let timer = null

  if (container) {
    container.addEventListener('scroll', function () {
      clearTimeout(timer)
      timer = setTimeout(() => {
        [].slice.call(container?.children).forEach((child) => {
          if (
            Math.abs(
              child.getBoundingClientRect().left -
                container?.getBoundingClientRect().left
            ) < 10
          ) {
            setPage(child.children[0].className)
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
        forecast,
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
