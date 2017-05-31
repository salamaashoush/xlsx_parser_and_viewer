var express = require('express'),
    glob = require('glob'),
    config = require('./config/config');

var app = express();
module.exports = require('./config/express')(app, config);

let server=app.listen(config.port, function () {
    console.log('Express server listening on port ' + config.port);
});
