import React, {useContext} from 'react'
import styled from 'styled-components'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { WeatherContext } from '../weatherContext'

export default function Header() {
  const {search, live} = useContext(WeatherContext)
  return (
    <Container color='transparent'>
    <Location>
    {live && 
      <strong>{search}</strong>
    }
    </Location>
    </Container>
  )
}

const Container = styled(AppBar)`
height: 4rem;
`

const Location = styled(Toolbar)`
color: white;
strong {
  display: flex;
flex-direction: column;
font-size: 1.2rem;
}
`

