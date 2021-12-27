import styled from 'styled-components'
import backgroundImage from '../assets/background-image.jpg'

export const View = styled.section`
 flex: none;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  scroll-snap-align: start;
  position: relative;
  background-image: url(${backgroundImage});
  background-size: 100% 100%;
  background-repeat: no-repeat;
`