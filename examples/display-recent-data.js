require('dotenv').config()
const AmbientWeatherApi = require('../lib/index')

const api = new AmbientWeatherApi({
  apiKey: process.env.AMBIENT_WEATHER_API_KEY || '7e1b99a6b97b4e248414daaec8df9a52262cf3cd9e2b44fc96fe0876eb67c80e',
  applicationKey: process.env.AMBIENT_WEATHER_APPLICATION_KEY || '1a6ca5d664f04d42b93406dfdbd212b485b11712a5574d80b66e78ac8485932b'
})

// list the user's devices
api.userDevices()
.then((devices) => {

  devices.forEach((device) => {
    // fetch the most recent data
    api.deviceData(device.macAddress, {
      limit: 5
    })
    .then((deviceData) => {
      console.log('The 5 most recent temperature reports for ' + device.info.name + ' - ' + device.info.location + ':')
      deviceData.forEach((data) => {
        console.log(data.date + ' - ' + data.tempf + '°F')
      })
      console.log('---')
    })
  })
})
