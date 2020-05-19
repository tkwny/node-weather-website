
const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8435bd8d5508ed8d4a6eaad7cfabe562&query='+ longitude +','+ latitude +'&units=f'

    // Response.body object destructures to 'body'
    request({ url, json: true }, (error, { body } = {}) => {
            if (error){
                callback('Unable to connect to weather service!')
            } else if (body.error){
                callback('Unable to find location!')
            } else {
                
                callback(undefined, body.current.weather_descriptions +
                    '. The current temperaturs is '+ body.current.temperature +
                    ' degrees in '+ body.location.name +', '+ body.location.region +
                '. But it feels like '+ body.current.feelslike +
                 ' degrees. Winds out of the '+ body.current.wind_dir +' at '+ body.current.wind_speed +'mph.')
            }
        })
        //console.log(url)
}

module.exports = forecast
