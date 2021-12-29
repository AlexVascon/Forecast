import React, {useContext} from 'react'
import { View } from '../components/View'
import dayjs from 'dayjs'
import styled from 'styled-components'
import cloudIcon from '../assets/cloud-icon.png'
import windSpeedIcon from '../assets/wind-speed-icon.png'
import windDirectionIcon from '../assets/compass-icon.png'
import humidityIcon from '../assets/humidity-icon.png'
import rainIcon from '../assets/rain.png'
import uvIndexIcon from '../assets/uv-icon.png'
import sunRiseIcon from '../assets/sunrise-icon.png'
import sunSetIcon from '../assets/sunset-icon.png'
import dewPointIcon from '../assets/dew-point-icon.png'
import maxTempIcon from '../assets/max-temp-icon.png'
import minTempIcon from '../assets/min-temp-icon.png'
import moon from '../assets/moon.png'
import sun from '../assets/sun.png'
import clouds from '../assets/clouds.png'
import moonClouds from '../assets/moon-clouds.png'
import sunClouds from '../assets/sun-clouds.png'
import dayRain from '../assets/rain-day.png'
import nightRain from '../assets/rain-night.png'
import { WeatherContext } from '../weatherContext'
import SubHeading from '../components/SubHeading'

export default function Live() {
  const { live, weekForecast } = useContext(WeatherContext)

  const compassDirections = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N' ]
  const calculateCompassDirection = (windDirection) => {
    const index = Math.round(Number(windDirection)/22.5,0) + 1
    return compassDirections[index]
  }

  const convertTimeStamp = (timestamp) => dayjs.unix(timestamp).format('HH:mm')

  const mainImageSource = (icon) => {
    switch (icon) {
      case '01d':
        return sun
      case '01n':
        return moon
      case '02d':
      case '04d':
        return sunClouds
      case '02n':
      case '04n':
        return moonClouds
      case '03d':
      case '03n':
        return clouds
      case '09d':
      case '10d':
        return dayRain
      case '09n':
      case '10n':
        return nightRain
      default:
    }
  };

  const upperWeatherStats = [
    {
      icon: cloudIcon,
      text: 'Cloud cover:',
      data: live?.clouds,
      symbol: '%',
    },
    {
      icon: windSpeedIcon,
      text: 'Wind speed:',
      data: live?.wind_speed,
      symbol: 'km',
    },
    {
      icon: windDirectionIcon,
      text: 'Wind direction:',
      data: calculateCompassDirection(live?.wind_deg),
      symbol: '',
    },
    {
      icon: humidityIcon,
      text: 'Humidity:',
      data: live?.humidity,
      symbol: '%',
    },
    {
      icon: uvIndexIcon,
      text: 'UV index:',
      data: live?.uvi,
      symbol: '',
    },
  ]

  const lowerWeatherStatsOne = [
    {
      icon: sunRiseIcon,
      text: 'Sunrise',
      data: convertTimeStamp(live?.sunrise),
    },
    {
      icon: sunSetIcon,
      text: 'Sunset',
      data: convertTimeStamp(live?.sunset),
    },
    {
      icon: dewPointIcon,
      text: 'Dew-point',
      data: live?.dew_point,
    },
  ]

  const lowerWeatherStatsTwo = [
      {
        icon: maxTempIcon,
        text: 'Max-temp',
        data: weekForecast && weekForecast[0] && weekForecast[0].temp?.max,
      },
      {
        icon: minTempIcon,
        text: 'Min-temp',
        data: weekForecast && weekForecast[0] && weekForecast[0].temp?.min,
      },
  ]

  return (
    <View>
    <SubHeading subtext={dayjs.unix(live?.dt).format("ddd, HH:mm")} />
      <LiveWeatherContainer>
      <Row>
        <MainImageColumn>
         {live && <Image src={mainImageSource(live.weather[0].icon)} />}
         <Condition>{live.weather[0].description}</Condition>
        </MainImageColumn>
        <Column>
        <List>
        {live && upperWeatherStats.map(stat => (
          <ListRow key={stat.icon}>
            <SubContainer>
              <Icon src={stat.icon} />
              <Text>{stat.text}</Text>
            </SubContainer>
            <Text>{stat.data}<small>{stat.symbol}</small></Text>
          </ListRow>
        ))}
        </List>
        </Column>
      </Row>
      <Row>
      {live && lowerWeatherStatsOne.map(stat => (
        <LowerSubContainer key={stat.text}>
        <LowerIcon src={stat.icon} />
        <LowerText>{stat.text}</LowerText>
        <LowerText>{stat.data}</LowerText>
        </LowerSubContainer>
      ))}
      </Row>
      <Row>
      {live && lowerWeatherStatsTwo.map(stat =>  (
        <LowerSubContainer key={stat.text}>
        <LowerIcon src={stat.icon} />
        <LowerText>{stat.text}</LowerText>
        <LowerText>{stat.data}&#176;C</LowerText>
        </LowerSubContainer>
      ))}
      <LowerSubContainer>
        <LowerIcon src={rainIcon} />
        <LowerText>Rain</LowerText>
        <LowerText>{weekForecast && weekForecast[0]?.rain}mm</LowerText>
        </LowerSubContainer>
      </Row>
      </LiveWeatherContainer>
    </View>
  )
}

const LiveWeatherContainer = styled.div`
background-color: rgba(137, 102, 145, 0.212);
width: 95%;
border-radius: .5rem;
@media(min-width: 415px) {
  top: 15%;
  max-width: 30rem;
}
`
const Row = styled.section`
flex: 1;
display: flex;
justify-content: center;
align-items: center;
`
const Column = styled.section`
flex: 1;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`
const MainImageColumn = styled.div`
flex: .7;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`
const Image = styled.img`
width: 90%;
height: auto;
`
const Condition = styled.p`
font-size: 1rem;
font-weight: 600;
text-align: center;
color: white;
`
const List = styled.ul`
flex: 1;
width: 90%;
list-style-type: none;
padding: 0;
`
const ListRow = styled.li`
width: 100%;
display: flex;
justify-content: space-between;
align-items: center;
border-bottom: 1px solid rgba(255, 255, 255, 0.418);
`
const SubContainer = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
gap: .5rem;
`
const LowerSubContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
gap: .2rem;
margin: .8rem 1.9rem;
`
const Icon = styled.span`
width: 1.5rem;
height: 1.5rem;
background-color: transparent;
background-image: url(${(props) => props.src});
background-size: contain;
background-repeat: no-repeat:
`
const LowerIcon = styled.span`
width: 3rem;
height: 3rem;
background-color: transparent;
background-image: url(${(props) => props.src});
background-size: contain;
background-repeat: no-repeat:
`
const Text = styled.p`
font-size: .8rem;
color: white;
`
const LowerText = styled.p`
font-size: .8rem;
color: white;
margin: 0;
`
