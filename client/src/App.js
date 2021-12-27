import React, {useContext} from 'react'
import { AppContainer } from './components/AppContainer'
import Nav from './components/Nav'
import { GlobalStyle } from './GlobalStyles'
import Live from './views/Live'
import Search from './views/Search'
import { WeatherContext } from './weatherContext'

function App() {
  const {live} = useContext(WeatherContext)
  return (
    <AppContainer id='app'>
    <GlobalStyle />
    <Nav />
    <Search />
    {live && <Live />}
    </AppContainer>
  )
}

export default App
