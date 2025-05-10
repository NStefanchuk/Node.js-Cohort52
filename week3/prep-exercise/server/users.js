import bcrypt from 'bcrypt'
import newDatabase from './database.js'
import jwt from 'jsonwebtoken'
const isPersistent = false
const database = newDatabase({ isPersistent })
const SECRET = '5439ldmlamd01201odm1k1p12p'
// Change this boolean to true if you wish to keep your
// users between restart of your application

// Create middlewares required for routes defined in app.js
// export const register = async (req, res) => {};

// You can also create helper functions in this file to help you implement logic
// inside middlewares
export const registrationUser = async (req, res) => {
  const { username, password } = req.body

  if (!username || !password)
    return res
      .status(400)
      .send({ message: 'Please provide both a username and a password' })

  const saltRounds = 10
  const hashedPassword = await bcrypt.hash(password, saltRounds)
  const createdUser = database.create({
    username: username,
    password: hashedPassword,
  })
  res.status(200)
  res.json({
    id: createdUser.id,
    username: createdUser.username
  })
}

export const loginUser = async (req, res) => {
  const { username, password } = req.body
  if (!username || !password)
    return res
      .status(400)
      .send({ message: 'Please enter both your username and password' })

  const userData = database.getByUsername(username)
  if (!userData)
    return res
      .status(400)
      .send({ message: `No account found for username "${username}"` })

  const getUser = database.getByUsername(username)
  const usersPassword = getUser.password
  const comparedPassword = await bcrypt.compare(password, usersPassword)

  if (!comparedPassword) {
    res.status(400)
    res.json({ message: 'Incorrect password. Please try again' })
    return
  }

  const usersID = getUser.id
  const token = jwt.sign(usersID, SECRET)

  res.status(201)
  res.json({ token: token })
}

export const profileUser = async (req, res) => {
  const authorizationHeader = req.headers['authorization']
  if (!authorizationHeader) {
    res.status(400)
    res.json({ message: 'Authorization token is missing' })
    return
  }
  const token = authorizationHeader.replace('Bearer ', '')
  try {
    const verifiedUser = jwt.verify(token.trim(), SECRET)
    if (!verifiedUser) {
      throw Error('token is not correct')
    }

    const userData = database.getById(verifiedUser)

    res.status(201)
    res.json({ message: `Welcome! ${userData.username}` })
  } catch (error) {
    res.status(400)
    res.json({ message: 'Invalid or expired token' })
  }
}

export const logOutUser = async (req, res) => {
  res.json({ message: 'You have been successfully logged out!' })
  res.status(204)
}
