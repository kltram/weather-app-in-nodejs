const Mongoose = require('mongoose');
var Config = require('../public/config/config.js');
let dbUrl = 'mongodb://'+Config.db.host+':'+Config.db.port+'/'+Config.db.dbname;
Mongoose.connect(dbUrl)

//load database
var db = Mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
    console.log('DB Connection succeeded.');
});

exports.db = db;