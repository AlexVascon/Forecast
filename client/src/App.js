import React, {useContext} from 'react'
import { AppContainer } from './components/AppContainer'
import Nav from './components/Nav'
import { GlobalStyle } from './GlobalStyles'
import HourlyForecast from './views/HourlyForecast'
import Live from './views/Live'
import Search from './views/Search'
import { WeatherContext } from './weatherContext'

function App() {
  const {live, hourlyForecast} = useContext(WeatherContext)
  return (
    <AppContainer id='app'>
    <GlobalStyle />
    <Nav />
    <Search />
    {live && <Live />}
    {hourlyForecast && <HourlyForecast />}
    </AppContainer>
  )
}

export default App
