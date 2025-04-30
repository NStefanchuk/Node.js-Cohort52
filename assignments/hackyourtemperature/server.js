import express from 'express'
import { engine } from 'express-handlebars'
import fetch from 'node-fetch'


const app = express()
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

app.get('/', (req, res) => {
  res.render('home')
})

app.use(express.json())

app.post('/weather', (req, res) => {
    const cityName = req.body.cityName
    res.json({message: 'City name: ' + cityName})
})


app.listen(3000, () => {
  console.log(`server started on http://localhost:3000`)
})
