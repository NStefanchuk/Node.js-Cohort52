import express from 'express'
import cors from 'cors'
import {registrationUser, loginUser, profileUser, logOutUser} from './users.js'

// TODO Use below import statement for importing middlewares from users.js for your routes
// TODO import { ....... } from "./users.js";

let app = express()

app.use(express.json())
app.use(cors())
// TODO: Create routes here, e.g. app.post("/register", .......)
app.post('/auth/register', registrationUser)

app.post('/auth/login', loginUser)

app.get('/auth/profile', profileUser)

app.post('/auth/logout', logOutUser)

// Serve the front-end application from the `client` folder
app.use(express.static('client'))

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
