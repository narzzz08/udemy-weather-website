const request = require('request')

const forecast = (long, lat, callback) =>{
    const url = `https://api.darksky.net/forecast/b788594bd0f4c01ca821567fb82a6120/${lat},${long}?units=si`

    request({ url, json: true }, (error,{body}) => {
        if(error){
            callback('Unable to connect to weather service')
        } else if(body.error){
            console.log(url)
            callback('Unable to find location')
        }else{  
            callback(undefined, body.daily.data[0].summary)
        }
    })

}

module.exports = forecast