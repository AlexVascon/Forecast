import React, {useContext} from 'react'
import { AppContainer } from './components/AppContainer'
import Nav from './components/Nav'
import { GlobalStyle } from './GlobalStyles'
import HourlyForecast from './views/hourly-forecast/HourlyForecast'
import Live from './views/Live'
import Search from './views/Search'
import WeekForecast from './views/week-forecast/WeekForecast'
import { WeatherContext } from './weatherContext'

function App() {
  const {live, hourlyForecast, weekForecast} = useContext(WeatherContext)
  return (
    <AppContainer id='app'>
    <GlobalStyle />
    <Nav />
    <Search />
    {live && <Live />}
    {hourlyForecast && <HourlyForecast />}
    {weekForecast && <WeekForecast />}
    </AppContainer>
  )
}

export default App
