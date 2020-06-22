const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5cc4250d99f8fc3599751b8d17358d49&query=' + lat + ',' + long + '&units=m'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            let weather_desc = response.body.current.weather_descriptions[0]
            let currentTemp = response.body.current.temperature
            let feelTemp = response.body.current.feelslike
            let humidity = response.body.current.humidity
            callback(undefined, `${weather_desc}. It is currently ${currentTemp} degrees out. It feels like ${feelTemp} degrees out. Humidity: ${humidity}%`)
        }
    })
}


module.exports = forecast