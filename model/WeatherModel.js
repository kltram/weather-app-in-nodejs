'use strict';
var Mongoose = require('mongoose');
const mongooseDB = require('../db/dbconnect.js').db;
var Config = require('../public/config/config.js');
const Schema = Mongoose.Schema;
   // define the db schema
   var WeatherSchema = new Schema({
      location: {type: String, unique : true, required : true, dropDups: true },
      weather: String,
      longitude: String,
      pressure: String,
      temperature: String,
      humidty: String,
      speed: String
   });
// Export the model
module.exports = mongooseDB.model(Config.db.schema, WeatherSchema);