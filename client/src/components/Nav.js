import React, {useContext} from 'react'
import styled from 'styled-components'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import dayjs from 'dayjs'
import { WeatherContext } from '../weatherContext'

export default function Nav() {
  const { page, search, live } = useContext(WeatherContext)

  const description = [
    {
      main: '',
      sub: ''
    },
    {
      main: search,
      sub: dayjs.unix(live?.dt).format("ddd, HH:mm")
    },
    {
      main: search,
      sub: 'Next 24 hours'
    },
    {
      main: search,
      sub: 'Next 7 days'
    },
  ]

  return (
    <AppBar color="transparent">
    <Information>
    {live && 
       <Time>
      <strong>{description[page].main}</strong>
      <b>{description[page].sub}</b>
    </Time>
    }
    </Information>
    </AppBar>
  )
}

const Information = styled(Toolbar)`
color: white;
`
const Time = styled.time`
display: flex;
flex-direction: column;
font-size: 1.2rem;
`
