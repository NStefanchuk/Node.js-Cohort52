import express from 'express'
import { engine } from 'express-handlebars'
import fetch from 'node-fetch'
import { API_KEY } from './sources/keys.js'


const app = express()

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

app.get('/', (req, res) => {
  res.render('home')
})

app.use(express.json())

app.post('/', async (req, res) => {
  try {
    const cityName = req.body.cityName
    const geoData = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`
    )
    const geoResponse = await geoData.json()
    console.log(geoResponse)
    if (geoResponse.length == 0) {
      throw new Error('City is not found')
    }

    const lat = geoResponse[0].lat
    const lon = geoResponse[0].lon
    console.log(lat, lon)

    const weatherData = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    )
    const weatherResponse = await weatherData.json()
    res.json({ 
      cityName: cityName,
      temperature: (weatherResponse.main.temp - 273.15).toFixed(1)
    });
  } catch (err) {
    res.json(err.message)
  }
})

export default app
