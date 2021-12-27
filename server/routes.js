import express from 'express'
const router = express.Router()
import {fetchLatitudeAndLongitude, fetchWeather} from './api.js'

router.get('/:location', async (req,res) => {
  const { location } = req.params
  try {
    const { data } = await fetchLatitudeAndLongitude(location)
    res.status(200).send(data)
  } catch (err) {
    if(err.response.status === 404) {
      console.error('invalid search')
      res.status(404)
    } else {
      console.error('unable to connect to server')
      res.status(500)
    }
    
  }
})

router.get('/weather/:latitude/:longitude', async (req, res) => {
  const { latitude, longitude } = req.params
  try {
    const { data } = await fetchWeather(latitude, longitude)
    res.status(200).send(data)
  } catch (err) {
    if(err.response.status === 404) {
      console.error('invalid search')
      res.status(404)
    } else {
      console.error('unable to connect to server')
      res.status(500)
    }
  }
})

export default router