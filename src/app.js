const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const publicDIRPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDIRPath))

app.get('', (req, res) =>{
    res.render('index',{
        title: 'Weather',
        name: 'Narzz'
    })
})

app.get('/about', (req, res) =>{
    res.render('about',{
        title: 'About me',
        name: 'Narzz'
    })
})

app.get('/help', (req, res) =>{
    res.render('help',{
        title: 'Help Page',
        message: 'This is a help message'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error:'Please provide a search term'
        })
    }
    
    geocode(req.query.address,(error, {long, lat, location} = {}) =>{
        if(error){
            return  res.send({error})
        }

        forecast(long,lat, (error, forecastData)=>{
            if(error){
                return  res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

    
})

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error:'Please provide a search term'
        })
    }
    res.send({
        products:[]
    })
})

app.get('/help/*',(req, res)=>{
    res.render('error',{
        title: '404',
        message: 'Help article not found',
    })
})

app.get('*',(req, res)=>{
    res.render('error',{
        title: '404',
        message: '404 not found',
    })
})

app.listen(3000, () => {
    console.log('listening to port 3000')
})