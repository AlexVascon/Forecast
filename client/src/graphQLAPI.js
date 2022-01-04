import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { RestLink } from 'apollo-link-rest'

const weatherAPIBaseURL = new RestLink({
  uri: process.env.REACT_APP_SERVER_URL,
})

const options = { resultCaching: false }
const client = new ApolloClient({
  cache: new InMemoryCache(options),
  link: weatherAPIBaseURL,
})

const fetchLatitudeAndLongitud = async (location) => {
  const query = gql`
  query latAndLon {
    data @rest(type: "", path: "/${location}") {
      id
     coord {
       lat
       lon
     }
    }
  }
  `
  return client.query({ query, fetchPolicy: 'network-only' })
}

const fetchWeatherFromAPI = async (geolocation, searchInput) => {
  let latitude
  let longitude
  if (geolocation) {
    latitude = geolocation.coords.latitude
    longitude = geolocation.coords.longitude
  } else {
    const { data } = await fetchLatitudeAndLongitud(searchInput)
    latitude = data.data.coord.lat
    longitude = data.data.coord.lon
  }

  const query = gql`
  query weather {
    data @rest(type: "", path: "/weather/${latitude}/${longitude}") {
      id
     timezone
     current {
       dt
       sunrise
       sunset
       temp
       humidity
       wind_speed
       wind_deg
       clouds
       dew_point
       uvi
       weather {
         icon
         description
       }
     }
     hourly {
       dt
       temp
       humidity
       wind_speed
       wind_deg
       clouds
       uvi
       pop
       weather {
         id
         icon
         description
       }
     }
     daily {
       dt
       sunrise
       sunset
       pop
       rain
       temp {
        min
        max
       }
       weather {
         description
         icon
       }
     }
     alerts {
       sender_name
       event
       start
       end
       description
       tags
     }
    }
  }
  `
  return client.query({ query, fetchPolicy: 'network-only' })
}

export default fetchWeatherFromAPI
