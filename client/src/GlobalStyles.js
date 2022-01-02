import { createGlobalStyle } from 'styled-components'
import purpleMountainBackground from './assets/background-image.jpg'

export const GlobalStyle = createGlobalStyle`
html, body {
  width: 100vw;
  height: 100vh;
  margin: 0;
  height: -webkit-fill-available;
  position: fixed;
  font-family: 'Roboto Mono', monospace;
  background-image: url(${purpleMountainBackground});
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

`
