import app from '../app.js'
import supertest from 'supertest'
import fetch from 'node-fetch'

jest.mock('node-fetch', () => jest.fn())

const request = supertest(app)

describe('POST /', () => {
  it('returns temperature for a valid city', async () => {
    const fakeGeoData = [{ lat: 52.37, lon: 4.89 }]
    const fakeWeatherData = {
      main: {
        temp: 283.15,
      },
    }

    fetch
      .mockResolvedValueOnce({
        json: async () => fakeGeoData,
      })
      .mockResolvedValueOnce({
        json: async () => fakeWeatherData,
      })

    const response = await request.post('/').send({ cityName: 'Amsterdam' })

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      cityName: 'Amsterdam',
      temperature: '10.0',
    })
  })

  it('returns error message for unknown city', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => [],
    })

    const response = await request.post('/').send({ cityName: 'FakeCityXYZ' })

    expect(response.statusCode).toBe(200)
    expect(response.body).toBe('City is not found')
  })
})
