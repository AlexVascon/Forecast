import React, { useContext, useState, useEffect } from 'react'
import { WeatherContext } from '../../weatherContext'
import { View } from '../../components/View'
import dayjs from 'dayjs'
import tempIcon from '../../assets/temp-icon.png'
import cloudIcon from '../../assets/cloud-icon.png'
import windSpeedIcon from '../../assets/wind-speed-icon.png'
import windDirectionIcon from '../../assets/compass-icon.png'
import humidityIcon from '../../assets/humidity-icon.png'
import rainIcon from '../../assets/rain.png'
import uvIndexIcon from '../../assets/uv-icon.png'
import moon from '../../assets/moon.png'
import sun from '../../assets/sun.png'
import Chart from 'chart.js/auto'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import {
  GraphsContainer,
  WhitePointersGraph,
  SunAndMoonGraph,
  MovingPointerGraph,
  List,
  HourlyInformationContainer,
  HourlyInformation,
  HourList,
  HourRow,
  HourText,
  PaddingTop,
  PaddingBottom,
  ListRow,
  SubContainer,
  Icon,
  Text,
  HourHighlight,
} from '../hourly-forecast/HourlyForecastStyling'
import SubHeading from '../../components/SubHeading'

export default function HourlyForecast() {
  const { hourlyForecast, live } = useContext(WeatherContext)
  const [twentieFourHourForecast, setTwentieFourHourForecast] =
    useState(undefined)
  const [temperatureEachHour, setTemperatureEachHour] = useState(undefined)
  const [maxTempValue, setMaxTempValue] = useState(undefined)
  const [minTempValue, setMinTempValue] = useState(undefined)
  const [chartLabels, setChartLabels] = useState(undefined)
  const [scrollPointerPosition, setScrollPointerPosition] = useState(undefined)
  const [hourInformation, setHourInformation] = useState(undefined)
  const [hourIndex, setHourIndex] = useState(0)
  const [loadChart, setLoadChart] = useState(false)
  Chart.register(ChartDataLabels) // allow labels above pointer dots
  const sunrise = new Image(15, 15)
  sunrise.src = sun
  const sunset = new Image(12, 12)
  sunset.src = moon

  // get first 24 hours (48 length)
  useEffect(() => {
    if (hourlyForecast && !twentieFourHourForecast?.length) {
      const filterFirstTwentieFourHours = hourlyForecast.filter(
        (hour, index) => index > 0 && index < 24
      )
      setTwentieFourHourForecast(filterFirstTwentieFourHours)
    }
  }, [hourlyForecast, twentieFourHourForecast])

  useEffect(() => {
    // set chart values (requires filtering through each value)
    if (twentieFourHourForecast) {
      if (!temperatureEachHour)
        setTemperatureEachHour(
          twentieFourHourForecast.map((hour) => Math.round(hour.temp))
        )
      if (!maxTempValue)
        setMaxTempValue(
          Math.round(
            // control line graph spread
            twentieFourHourForecast.reduce((prev, curr) =>
              Math.round(curr.temp) > Math.round(prev.temp) ? curr : prev
            ).temp
          )
        )
      if (!minTempValue)
        setMinTempValue(
          Math.round(
            // close distance from bottom border
            twentieFourHourForecast.reduce((prev, curr) =>
              Math.round(curr.temp) < Math.round(prev.temp) ? curr : prev
            ).temp
          )
        )
      if (!chartLabels)
        setChartLabels(twentieFourHourForecast.map((hour) => getHour(hour.dt)))
      if (!hourInformation) setHourInformation(twentieFourHourForecast[0])
    }
  }, [
    chartLabels,
    twentieFourHourForecast,
    temperatureEachHour,
    maxTempValue,
    minTempValue,
    hourInformation,
  ])

  useEffect(() => {
    // load chart once all values are set
    if (
      temperatureEachHour &&
      chartLabels &&
      hourInformation &&
      maxTempValue &&
      minTempValue
    ) {
      setLoadChart(true)
    }
  }, [
    temperatureEachHour,
    chartLabels,
    hourInformation,
    maxTempValue,
    minTempValue,
  ])

  useEffect(() => {
    // update dynamic point
    if (twentieFourHourForecast) {
      setScrollPointerPosition(
        twentieFourHourForecast.map((hour, index) =>
          index === hourIndex ? 5 : 0
        )
      )
    }
  }, [hourIndex, twentieFourHourForecast])

  const getHour = (date) => dayjs.unix(date).format('H')
  const setPointVisuals = (moonVal, sunVal, elseVal) => {
    if (twentieFourHourForecast) {
      return twentieFourHourForecast.map((hour) => {
        if (getHour(hour.dt) === getHour(live.sunset)) return moonVal
        if (getHour(hour.dt) === getHour(live.sunrise)) return sunVal
        return elseVal
      })
    }
    return elseVal
  }

  const compassDirections = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW',
    'N',
  ]
  const calculateCompassDirection = (windDirection) => {
    const index = Math.round(Number(windDirection) / 22.5, 0) + 1
    return compassDirections[index]
  }

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
      data: calculateCompassDirection(hourInformation?.wind_deg),
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
    {
      icon: rainIcon,
      text: 'precipitation',
      data: hourInformation?.pop,
      symbol: '%',
    },
  ]

  const onScroll = (e) => {
    const verticalScrollPosition = e.target.scrollTop
    const result = Math.round(Math.round(verticalScrollPosition) / 52)
    if (result >= 0 && result <= 24) {
      setHourIndex(result)
      setHourInformation(twentieFourHourForecast[result])
    }
  }

  return (
    <View>
      <SubHeading subtext='Next 24 hours' />
      <GraphsContainer>
        {loadChart && (
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
              animation: false,
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
        )}
        {loadChart && (
          <SunAndMoonGraph
            data={{
              labels: chartLabels,
              datasets: [
                {
                  data: temperatureEachHour,
                  showLine: false,
                  pointRadius: setPointVisuals(4, 4, 0),
                  pointStyle: setPointVisuals(sunset, sunrise, ''),
                  datalabels: {
                    align: 'end',
                    anchor: 'center',
                    clamp: true,
                    formatter: function (value, context) {
                      // determine which point icon to display time
                      const HourOfTemp =
                        context.chart.data.labels[context.dataIndex]
                      if (HourOfTemp === getHour(live.sunset))
                        return dayjs.unix(live.sunset).format('HH:mm')
                      if (HourOfTemp === getHour(live.sunrise))
                        return dayjs.unix(live.sunrise).format('HH:mm')
                      return ''
                    },
                  },
                },
              ],
            }}
            height={20}
            width={100}
            options={{
              animation: false,
              layout: {
                padding: { left: 0, right: 0, top: 10, bottom: 0 },
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
        )}
        {scrollPointerPosition && loadChart && (
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
              animation: false,
              animations: {
                radius: {
                  duration: 0,
                  easing: 'linear',
                  from: 4,
                  to: 0,
                },
              },
              plugins: {
                layout: {
                  padding: { left: 5, right: 5, top: 5, bottom: 5 },
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
        )}
      </GraphsContainer>
      <HourlyInformationContainer>
        <HourlyInformation>
          <List>
            {hourlyForecast &&
              weatherStats.map((stat) => (
                <ListRow key={stat.icon}>
                  <SubContainer>
                    <Icon src={stat.icon} />
                    <Text>{stat.text}</Text>
                  </SubContainer>
                  <Text>
                    {stat.data}
                    <small>{stat.symbol}</small>
                  </Text>
                </ListRow>
              ))}
          </List>
        </HourlyInformation>
        <HourHighlight />
        <HourList onScroll={onScroll}>
          <PaddingTop />
          {twentieFourHourForecast &&
            twentieFourHourForecast.map((hour) => (
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
