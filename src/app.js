const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views locaiton 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Randy Bradshaw'
    })
})

app.get('/about',(req, res) => {
    res.render('about',{
        title: 'About',
        name: 'Randy Bradshaw'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'Please provide an address.'
        })
    } else {
        geocode(req.query.address, (error, { location, latitude, longitude } = {}) => {
            if (error) {
                return res.send({ error })
            }
            forecast(latitude,longitude, (error, forecastData) => {
                if (error){
                    return res.send({ error })
                }
                res.send({
                    location: location,
                    forecast: forecastData
                })
            })
        })
    }
})

app.get('/products', (req, res) =>{
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    } 

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help', (req, res) => {
   res.render('help',{
       title: 'Help',
       message: 'This is a sample help message',
       name: 'Randy Bradshaw'
   })
})

app.get('/help/*',(req, res) => {
    res.render('404',{
        title: '404 Page',
        message: 'Help article not found.',
        name: 'Randy Bradsahw'
    })
})

app.get('*',(req, res) => {
    res.render('404',{
        title: '404 Page',
        message: 'Page not found.',
        name: 'Randy Bradshaw'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+ port)
})

