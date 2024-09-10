require('dotenv').config()
const AmbientWeatherApi = require('../lib/index')

// helper function
function getName (device) {
  return device.info.name
}

const apiKey = process.env.AMBIENT_WEATHER_API_KEY || '7e1b99a6b97b4e248414daaec8df9a52262cf3cd9e2b44fc96fe0876eb67c80e'
const api = new AmbientWeatherApi({
  apiKey,
  applicationKey: process.env.AMBIENT_WEATHER_APPLICATION_KEY || '1a6ca5d664f04d42b93406dfdbd212b485b11712a5574d80b66e78ac8485932b'
})

api.connect()
api.on('connect', () => console.log('Connected to Ambient Weather Realtime API!'))

api.on('subscribed', data => {
  console.log('Subscribed to ' + data.devices.length + ' device(s): ')
  console.log(data.devices.map(getName).join(', '))
})
api.on('data', data => {
  console.log(data.date + ' - ' + getName(data.device) + ' current outdoor temperature is: ' + data.tempf + '°F')
})
api.subscribe(apiKey)
