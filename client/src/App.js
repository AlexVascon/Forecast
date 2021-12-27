import React, {useContext} from 'react'
import { AppContainer } from './components/AppContainer'
import { GlobalStyle } from './GlobalStyles'
import Live from './views/Live'
import Search from './views/Search'
import { WeatherContext } from './weatherContext'

function App() {
  const {live} = useContext(WeatherContext)
  return (
    <AppContainer>
    <GlobalStyle />
    <Search />
    {live && <Live />}
    </AppContainer>
  )
}

export default App
