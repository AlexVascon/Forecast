import React, { useContext } from 'react'
import { WeatherContext } from '../../weatherContext'
import { View } from '../../components/View'
import dayjs from 'dayjs'
import moon from '../../assets/moon.png'
import sun from '../../assets/sun.png'
import maxTempIcon from '../../assets/max-temp-icon.png'
import minTempIcon from '../../assets/min-temp-icon.png'
import precipitationIcon from '../../assets/humidity-icon.png'
import {
  DaysInWeekList,
  DayRow,
  DayNameContainer,
  MainIcon,
  Title,
  SubTitle,
  SubContainer,
  Icon,
  Text
} from './WeekForecastStyling'
import SubHeading from '../../components/SubHeading'

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

