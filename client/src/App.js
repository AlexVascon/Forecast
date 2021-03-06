import React, { useContext } from 'react'
import { AppContainer } from './components/AppContainer'
import Header from './components/Header'
import { GlobalStyle } from './GlobalStyles'
import HourlyForecast from './views/hourly-forecast/HourlyForecast'
import Live from './views/Live'
import Search from './views/Search'
import WeekForecast from './views/WeekForecast'
import { WeatherContext } from './weatherContext'

function App() {
  const { live, hourlyForecast, weekForecast } = useContext(WeatherContext)
  return (
    <AppContainer id='app'>
      <GlobalStyle />
      <Header />
      <Search />
      {live && <Live />}
      {hourlyForecast && <HourlyForecast />}
      {weekForecast && <WeekForecast />}
    </AppContainer>
  )
}

export default App
