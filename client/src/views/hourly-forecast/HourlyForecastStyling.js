import styled from 'styled-components'
import { Line } from 'react-chartjs-2'

export const GraphsContainer = styled.section`
  display: flex;
  justify-content: flex-end;
  position: relative;
  width: 90%;
  height: 7em;
  top: 12%;
  left: 0%;
  right: 0%;
  margin: auto;
  margin-top: 0;
  border-radius: 0.5em;
  @media only screen and (min-width: 415px) {
    max-width: 30rem;
    height: 10em;
    top: 10%;
  }
`
export const BaseLineGraphSpecs = styled(Line)`
  position: absolute;
  width: 100%;
  left: 0%;
  right: 0%;
  margin: auto;
`
export const WhitePointersGraph = styled(BaseLineGraphSpecs)`
  top: 50%;
  z-index: 2;
`
export const SunAndMoonGraph = styled(BaseLineGraphSpecs)`
  top: 0%;
  z-index: 1;
`
export const MovingPointerGraph = styled(BaseLineGraphSpecs)`
  top: 50%;
  z-index: 3;
`
export const List = styled.ul`
  flex: 1;
  width: 100%;
  list-style-type: none;
  padding: 0;
  height: 20rem;
`
export const HourlyInformationContainer = styled.div`
  position: absolute;
  bottom: 20%;
  width: 90vw;
  height: 20rem;
  border-radius: 0.5rem;
  background-color: rgba(137, 102, 145, 0.212);
  overflow-y: hidden;
  color: white;
  @media only screen and (min-width: 415px) {
    top: 45%;
    max-width: 35rem;
    height: 25rem;
    bottom: 5%;
  }
`
export const HourlyInformation = styled.div`
  display: flex;
  position: absolute;
  left: 3%;
  right: 100%;
  bottom: 15%;
  width: 70%;
  margin: auto;
  height: 14rem;
  align-items: center;
  font-size: 1rem;
  justify-content: left;
  @media only screen and (min-width: 415px) {
    width: 65%;
    height: 20rem;
  }
`
export const HourList = styled.ul`
  list-style-type: none;
  padding-left: 0;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
  position: absolute;
  justify-content: flex-start;
  align-items: flex-start;
  width: 25%;
  height: 20rem;
  top: 0%;
  right: 0%;
  margin: auto;
  margin-left: 0%;
  gap: 1.5rem;
  background-color: rgba(83, 58, 88, 0.548);
  text-align: left;
  @media only screen and (min-width: 415px) {
    position: absolute;
    width: 30%;
    height: 20rem;
    top: 0%;
    left: 70%;
    right: 0%;
    gap: 1.5rem;
    margin-right: 0;
    height: 100%;
  }
`
export const HourRow = styled.li`
  padding: 0;
  height: 3.2rem;
  position: relative;
  @media only screen and (min-width: 415px) {
    padding-left: 29%;
  }
`
export const HourText = styled.p`
  padding: 0;
  margin: 0;
  font-size: 1.4rem;
`
export const PaddingTop = styled.div`
  display: flex;
  position: relative;
  left: 0%;
  right: 0%;
  width: 100vw;
  height: 5rem;
  padding: 3.6rem 0rem;
  @media only screen and (min-width: 415px) {
    padding: 4.6rem 0rem;
    width: 50%;
    margin: 0;
  }
`
export const PaddingBottom = styled.div`
  display: flex;
  position: relative;
  left: 0%;
  right: 0%;
  width: 100vw;
  height: 10rem;
  padding: 4.1rem 0;
  @media only screen and (min-width: 415px) {
    padding: 5.4rem 0;
    width: 50%;
    margin: 0;
  }
`
export const ListRow = styled.li`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.418);
`
export const SubContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
`
export const Icon = styled.span`
width: 1.7rem;
height: 1.7rem;
background-color: transparent;
background-image: url(${(props) => props.src});
background-size: contain;
background-repeat: no-repeat:
`
export const Text = styled.p`
  font-size: 1rem;
  color: white;
`
export const HourHighlight = styled.span`
  position: absolute;
  top: 40%;
  width: 25%;
  right: 0%;
  margin: auto;
  height: 3em;
  border-top: 1px solid rgba(255, 255, 255, 0.507);
  border-bottom: 1px solid rgba(255, 255, 255, 0.568);
  background-color: rgba(50, 21, 56, 0.521);
  @media only screen and (min-width: 415px) {
    top: 40%;
    width: 30%;
    left: 70%
  }
`

