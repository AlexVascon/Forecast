import React, {useContext} from 'react'
import styled from 'styled-components'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { WeatherContext } from '../weatherContext'
import reloadIcon from '../assets/reload-icon.png'

export default function Header() {
  const {search, live, fetchWeather} = useContext(WeatherContext)
  return (
    <Container color='transparent'>
      {live && <Location>
      <strong>{search}</strong>
      <Reload onClick={fetchWeather} />
    </Location>
      }
    </Container>
  )
}

const Container = styled(AppBar)`
height: 4rem;
`

const Location = styled(Toolbar)`
color: white;
display: flex;
width: 90%;
justify-content: space-between;
align-items: center;
strong {
  display: flex;
flex-direction: column;
font-size: 1.2rem;
}
`
const Reload = styled.button`
width: 1.5rem;
height: 1.5rem;
background-color: transparent;
background-image: url(${reloadIcon});
background-size: contain;
background-repeat: no-repeat;
border: none;
border-radius: 50%;
&:hover {
  cursor: pointer;
  box-shadow: 0px 0px 20px 5px rgba(255,255,255,0.5)
}
`

