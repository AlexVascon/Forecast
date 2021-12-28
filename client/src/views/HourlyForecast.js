import React, { useContext, useState, useEffect } from 'react'
import { WeatherContext } from '../weatherContext'
import { View } from '../components/View'
import styled from 'styled-components'
import dayjs from 'dayjs'
import tempIcon from '../assets/temp-icon.png'
import cloudIcon from '../assets/cloud-icon.png'
import windSpeedIcon from '../assets/wind-speed-icon.png'
import windDirectionIcon from '../assets/compass-icon.png'
import humidityIcon from '../assets/humidity-icon.png'
import uvIndexIcon from '../assets/uv-icon.png'
import moon from '../assets/moon.png'
import sun from '../assets/sun.png'
import Chart from 'chart.js/auto'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { Line } from 'react-chartjs-2'

export default function HourlyForecast() {
  const { hourlyForecast, live} = useContext(WeatherContext)
  const [hourInformation, setHourInformation] = useState(undefined)
  const [hourIndex, setHourIndex] = useState(0)
  Chart.register(ChartDataLabels) // allow labels above pointer dots
  const twentieFourHourForecast = hourlyForecast.filter((hour, index) => index > 0 && index < 24)
  const temperatureEachHour = twentieFourHourForecast.map(hour => Math.round(hour.temp))
  const maxTempValue = Math.round(twentieFourHourForecast.reduce((prev, curr) => Math.round(curr.temp) > Math.round(prev.temp) ? curr : prev).temp) // control line graph spread
  const minTempValue = Math.round(twentieFourHourForecast.reduce((prev, curr) => Math.round(curr.temp) < Math.round(prev.temp) ? curr : prev).temp)  // close distance from bottom border
  const getHour = (date) => dayjs.unix(date).format('H')
  const chartLabels = twentieFourHourForecast.map((hour) => getHour(hour.dt))
  const setPointVisuals = (moonVal, sunVal, elseVal) => (twentieFourHourForecast.map(hour => {
    if (getHour(hour.dt) === getHour(live.sunset)) return moonVal
    if (getHour(hour.dt) === getHour(live.sunrise)) return sunVal
    return elseVal
  }))
  const sunrise = new Image(15, 15)
  sunrise.src = sun
  const sunset = new Image(12, 12)
  sunset.src = moon

  const compassDirections = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N' ]
  const calculateCompassDirection = (windDirection) => {
    const index = Math.round(Number(windDirection)/22.5,0) + 1
    return compassDirections[index]
  }

  const onScroll = (e) => {
    const verticalScrollPosition = e.target.scrollTop
    const result = Math.round(Math.round(verticalScrollPosition) / 52)
    if (result >= 0 && result <= 24) setHourIndex(result)
  }

  const scrollPointerPosition = twentieFourHourForecast.map((hour, index) => index === hourIndex ? 5 : 0)

  useEffect(() => {
    const hourDetails = () => twentieFourHourForecast.filter((hour, index) => index === hourIndex)
    setHourInformation(hourDetails()[0])
  }, [hourIndex,twentieFourHourForecast])

  const weatherStats = [
    {
      icon: tempIcon,
      text: 'Temperature:',
      data: Math.round(hourInformation?.temp),
      symbol: '•',
    },
    {
      icon: cloudIcon,
      text: 'Cloud cover:',
      data: hourInformation?.clouds,
      symbol: '%',
    },
    {
      icon: windSpeedIcon,
      text: 'Wind speed:',
      data: hourInformation?.wind_speed,
      symbol: 'km',
    },
    {
      icon: windDirectionIcon,
      text: 'Wind direction:',
      data: (calculateCompassDirection(hourInformation?.wind_deg)),
      symbol: '',
    },
    {
      icon: humidityIcon,
      text: 'Humidity:',
      data: hourInformation?.humidity,
      symbol: '%',
    },
    {
      icon: uvIndexIcon,
      text: 'UV index:',
      data: hourInformation?.uvi,
      symbol: '',
    },
  ]

  return (
    <View id='hourly-forecast'>
    { hourlyForecast && <GraphsContainer>
     <WhitePointersGraph
      data={{
            labels: chartLabels,
            datasets: [
              {
                data: temperatureEachHour,
                backgroundColor: 'white',
                borderColor: 'white',
                borderWidth: 1,
                tension: 0.4,
                pointRadius: setPointVisuals(4, 4, 0),
                datalabels: {
                  align: 'start',
                  anchor: 'start',
                  color: 'transparent',
                },
              },
            ],
          }}
          height={20}
          width={100}
          options={{
            responsive: true,
            plugins: {
              layout: {
                padding: {
                  left: 5,
                  right: 5,
                  top: 5,
                  bottom: 5,
                },
              },
              legend: {
                display: false,
                labels: {
                  boxWidth: 0,
                },
              },
            },
            scales: {
              x: {
                grid: {
                  display: false,
                  borderColor: 'white',
                },
                ticks: {
                  display: false,
                  stepSize: 2,
                },
              },
              y: {
                min: minTempValue - 2,
                max: maxTempValue + 1,
                grid: {
                  display: false,
                },
                ticks: {
                  display: false,
                  autoSkip: false,
                  stepSize: 2,
                },
              },
            },
          }}
    />
    <SunAndMoonGraph
       data={{
            labels: chartLabels,
            datasets: [{
                data: temperatureEachHour,
                showLine: false,
                pointRadius: setPointVisuals(4, 4, 0),
                pointStyle: setPointVisuals(sunset, sunrise, ''),
                datalabels: {
                  align: 'end',
                  anchor: 'center',
                  clamp: true,
                  formatter: function (value, context) { // determine display time above icon
                    const HourOfTemp = context.chart.data.labels[context.dataIndex]
                    if (HourOfTemp === getHour(live.sunset)) return dayjs.unix(live.sunset).format('HH:mm')
                    if (HourOfTemp === getHour(live.sunrise)) return dayjs.unix(live.sunrise).format('HH:mm')
                    return ''
                  },
                },
              }],
          }}
          height={20}
          width={100}
          options={{
            layout: {
              padding: {left: 0,right: 0,top: 10,bottom: 0},
            },
            responsive: true,
            plugins: {
              datalabels: {
                color: setPointVisuals('white', 'white', 'transparent'),
              },
              legend: {
                display: false,
                labels: {
                  boxWidth: 0,
                },
              },
            },
            scales: {
              x: {
                grid: {
                  display: false,
                  borderColor: 'transparent',
                },
                ticks: {
                  display: false,
                  autoSkip: false,
                  stepSize: 5,
                },
              },
              y: {
                min: minTempValue - 2,
                max: maxTempValue + 15,
                grid: {
                  display: false,
                  drawBorder: false,
                },
                ticks: {
                  display: false,
                  stepSize: 2,
                },
              },
            },
          }}
    />
    <MovingPointerGraph
      data={{
            labels: chartLabels,
            datasets: [
              {
                data: temperatureEachHour,
                backgroundColor: 'white',
                tension: 0.4,
                pointRadius: scrollPointerPosition,
              },
            ],
          }}
          height={20}
          width={100}
          options={{
            responsive: true,
            animations: {
              radius: {
                duration: 0,
                easing: 'linear',
                from: 4,
                to: 0,
                loop: true,
              },
            },
            plugins: {
              layout: {
                padding: {left: 5,right: 5,top: 5,bottom: 5},
              },
              datalabels: {
                display: false,
              },
              legend: {
                display: false,
                labels: {
                  boxWidth: 0,
                },
              },
            },
            scales: {
              x: {
                grid: {
                  display: false,
                  drawBorder: false,
                },
                ticks: {
                  display: false,
                  stepSize: 2,
                },
              },
              y: {
                min: minTempValue - 2,
                max: maxTempValue + 1,
                grid: {
                  display: false,
                  drawBorder: false,
                },
                ticks: {
                  display: false,
                  stepSize: 2,
                },
              },
            },
          }}
    />
    </GraphsContainer>
    }
    <HourlyInformationContainer>
    <HourlyInformation>
      <List>
      {hourlyForecast && weatherStats.map(stat => (
          <ListRow key={stat.icon}>
            <SubContainer>
              <Icon src={stat.icon} />
              <Text>{stat.text}</Text>
            </SubContainer>
            <Text>{stat.data}<small>{stat.symbol}</small></Text>
          </ListRow>
        ))}
        </List>
      </HourlyInformation>
        <Highlight />
        <HourList onScroll={onScroll}>
        <PaddingTop />
        {hourInformation && twentieFourHourForecast.map(hour => (
          <HourRow key={hour.dt}>
            <HourText>{dayjs.unix(hour.dt).format('HH:mm')}</HourText>
          </HourRow>
        ))}
        <PaddingBottom />
        </HourList>
      </HourlyInformationContainer>
    </View>
  )
}

const GraphsContainer = styled.section`
display: flex;
justify-content:flex-end;
position: relative;
width: 90%;
height: 7em;
top: 12%;
left: 0%;
right: 0%;
margin: auto;
margin-top: 0;
border-radius: .5em;
`
const BaseLineGraphSpecs = styled(Line)`
  position: absolute;
    width: 100%;
    left: 0%;
    right: 0%;
    margin: auto;
`
const WhitePointersGraph = styled(BaseLineGraphSpecs)`
top: 50%;
z-index: 2;
`
const SunAndMoonGraph = styled(BaseLineGraphSpecs)`
top: 0%;
z-index: 1;
`
const MovingPointerGraph = styled(BaseLineGraphSpecs)`
top: 50%;
z-index: 3;
`
const List = styled.ul`
flex: 1;
width: 100%;
list-style-type: none;
padding: 0;
height: 20rem;
`
const HourlyInformationContainer = styled.div`
 position: absolute;
    bottom: 20%;
    width: 90vw;
    height: 20rem;
    border-radius: .5rem;
    background-color: rgba(137, 102, 145, 0.212);
    overflow-y: hidden;
    color: white;
`
const HourlyInformation = styled.div`
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
    justify-content:left;
`
const HourList = styled.ul`
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
`
const HourRow = styled.li`
 padding: 0;
height: 3.2rem;
position: relative; 
`
const HourText = styled.p`
 padding: 0;
    margin: 0;
font-size: 1.4rem;
`
const PaddingTop = styled.div`
display: flex;
    position: relative;
    left: 0%;
    right: 0%;
    width: 100vw;
    height: 5rem;
    padding: 3.6rem 0rem;
`
const PaddingBottom = styled.div`
  display: flex;
    position: relative;
    left: 0%;
    right: 0%;
    width: 100vw;
    height: 10rem;
    padding: 4.1rem 0;
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
const Icon = styled.span`
width: 1.7rem;
height: 1.7rem;
background-color: transparent;
background-image: url(${(props) => props.src});
background-size: contain;
background-repeat: no-repeat:
`
const Text = styled.p`
font-size: 1rem;
color: white;
`
const Highlight = styled.span`
 position: absolute;
    top: 40%;
    width: 25%;
    right: 0%;
    margin: auto;
    height: 3em;
    border-top: 1px solid rgba(255, 255, 255, 0.507);
    border-bottom: 1px solid rgba(255, 255, 255, 0.568);
    background-color: rgba(50, 21, 56, 0.521);
`
