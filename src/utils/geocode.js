const request = require('request')

const key= 'pk.eyJ1IjoibmFyenowOCIsImEiOiJjazR5cDN6dHcwMnlxM2ZuemYwbXo5b3FvIn0.TfXHoXnrwwBkkZlICSD9Vg'

const geocode = (address, callback) =>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${key}&limit=1`

    request({url, json:true}, (error, {body}) =>{
        if(error){
            callback('Unable to connect to location services')
        }else if(body.features.length === 0){
            callback('Unable to find location')
        } else{
            callback(undefined, {
                long: body.features[0].center[0],
                lat: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })

}

module.exports = geocode