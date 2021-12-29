import React from 'react'
import styled from 'styled-components'

export default function SubHeading({subtext}) {
  return (
    <Container>
      <b>{subtext}</b>
    </Container>
  )
}
const Container = styled.div`
position: absolute;
top: 5.5%;
left: 1.2rem;
width: 100vw;
display: flex;
color: white;
@media(min-width: 550px) {
    left: 1.7rem;
  }
b {
  font-size: 1rem;
}
`
