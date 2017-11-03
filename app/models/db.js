'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let dbURI = 'mongodb://donation:donation@ds145275.mlab.com:45275/donation-web';
//let dbURI = 'mongodb://node:nodeJS@192.168.56.101:27017/donation?authSource=admin';
if (process.env.NODE_ENV === 'production') {
    dbURI = process.env.MONGOLAB_URI;
}

mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});
