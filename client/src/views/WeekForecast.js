import React, { useContext } from 'react'
import { WeatherContext } from '../weatherContext'
import { View } from '../components/View'
import dayjs from 'dayjs'
import moon from '../assets/moon.png'
import sun from '../assets/sun.png'
import maxTempIcon from '../assets/max-temp-icon.png'
import minTempIcon from '../assets/min-temp-icon.png'
import precipitationIcon from '../assets/humidity-icon.png'
import SubHeading from '../components/SubHeading'
import styled from 'styled-components'

export default function WeekForecast() {
  const { weekForecast } = useContext(WeatherContext)
  const getDayOfWeek = (timeStamp) => dayjs.unix(timeStamp).format('dddd')
  const convertTimeStamp = (timestamp) => dayjs.unix(timestamp).format('HH:mm')

  return (
    <View>
      <SubHeading subtext='Next 7 days' />
      <DaysInWeekList>
        {weekForecast &&
          weekForecast.map((day) => (
            <DayRow key={day.dt}>
              <DayNameContainer>
                <MainIcon
                  src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                />
                <Title>{getDayOfWeek(day.dt)}</Title>
                <SubTitle>{day.weather[0].description}</SubTitle>
              </DayNameContainer>
              <SubContainer>
                <Icon src={maxTempIcon} />
                <Text>{Math.round(day.temp.max)}&#176;C</Text>
              </SubContainer>
              <SubContainer>
                <Icon src={minTempIcon} />
                <Text>{Math.round(day.temp.min)}&#176;C</Text>
              </SubContainer>
              <SubContainer>
                <Icon src={sun} />
                <Text>{convertTimeStamp(day.sunrise)}</Text>
              </SubContainer>
              <SubContainer>
                <Icon src={moon} />
                <Text>{convertTimeStamp(day.sunset)}</Text>
              </SubContainer>
              <SubContainer>
                <Icon src={precipitationIcon} />
                <Text>{Math.round(day.pop)}%</Text>
              </SubContainer>
            </DayRow>
          ))}
      </DaysInWeekList>
    </View>
  )
}

const DaysInWeekList = styled.ul`
  position: absolute;
  top: 9%;
  bottom: 3%;
  margin: auto;
  padding: 0;
  width: 93%;
  display: flex;
  flex-direction: column;
  overflow: auto;
  overscroll-behavior-y: contain;
  border-radius: 0.5rem;
  background-color: rgba(137, 102, 145, 0.212);
`
const DayRow = styled.li`
  flex: 1;
  width: 95%;
  margin-left: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.418);
  :last-child {
    border-bottom: none;
  }
`
const DayNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: left;
  width: 4rem;
  gap: 0rem;
  margin: 0.2rem 0.3rem;
`
const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 0.3rem;
  margin: 0.8rem 0rem;
`
const Icon = styled.span`
  width: 1.7rem;
  height: 1.7rem;
  background-color: transparent;
  background-image: url(${(props) => props.src});
  background-size: contain;
  background-repeat: no-repeat;
`
const MainIcon = styled.span`
  width: 2.2rem;
  height: 2.2rem;
  background-color: transparent;
  background-image: url(${(props) => props.src});
  background-size: contain;
  background-repeat: no-repeat;
  margin-bottom: -0.2rem;
  margin-top: -0.5rem;
  padding: 0;
`
const Title = styled.h2`
  font-size: 0.8rem;
  color: white;
  margin: auto;
  margin-left: 0;
  margin-top: 0;
  text-align: left;
`
const SubTitle = styled.p`
  font-size: 0.8rem;
  color: white;
  margin: auto;
  margin-left: 0;
  text-align: left;
  overflow-wrap: break-word;
`
const Text = styled.p`
  font-size: 0.8rem;
  color: white;
  margin: 0;
`
