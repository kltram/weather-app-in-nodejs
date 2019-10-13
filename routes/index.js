'use strict';
var express = require('express');
var request = require('request');

var router = express.Router();

var Weather = require('../model/WeatherModel.js');
var Config = require('../public/config/config.js');
const mongooseDB = require('../db/dbconnect.js').db;

/* GET home page. */
router.get('/', function(req, res, next) {
 res.render('index', {'body':'', forecast: ''});
});

router.post('/weather', function(req, res, next){
  let city = req.body.city;
  let urlWeather = Config.app.url+city+"&"+Config.app.appid;

 request(urlWeather, function (error, response, body) {

       let forecast = "For city "+city+', country '+city;
      // Print the response status code if a response was received
      if(error || response.statusCode != 200){
        var Comment=  Weather.find({'location':city},function (err, weather) {
              if (err) console.log('err----',err);
               let data=[{
                  longitude:weather.longitude,
                  pressure: weather.pressure,
                  temperature: weather.temperature,
                  humidty: weather.humidty,
                  speed: weather.speed
                }];
              console.log(weather);
              res.render('index', {parsedJSON : weather, forecast: forecast});
              }).limit(1);// end Team.find 
            } else{
                var weatherReports =new Weather({
                location: city,
                weather: JSON.parse(body).weather[0].main,
                longitude: JSON.parse(body).coord.lon,
                pressure: JSON.parse(body).main.pressure,
                temperature: JSON.parse(body).main.temp,
                humidty: JSON.parse(body).main.humidity,
                speed: JSON.parse(body).wind.speed
            });
                var result = weatherReports.save(); 
                let weather=[{
                        longitude:JSON.parse(body).coord.lon,
                        pressure: JSON.parse(body).main.pressure,
                        temperature: JSON.parse(body).main.temp,
                        humidty: JSON.parse(body).main.humidity,
                        speed: JSON.parse(body).wind.speed
                }];
                console.log(weather);
                res.render('index', {parsedJSON : weather, forecast: forecast});
      }

   });
});

module.exports = router;

