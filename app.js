// Author: Jean-Philippe Beaudet @ S3R3NITY Technology
// Voucher-jsclient.
//


// dependencies
var path = require('path');
var express = require('express');
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var logger = require('morgan');
var mongoose = require('mongoose');

// main config
var app = express();
var config = require('./scripts/config.js');
var server = require('http').createServer(app);
app.set('port', process.env.PORT || config.port );
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'jade');
app.set('view options', { layout: true });

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('express-session')({
    secret: 'voucherclient_secret',
    resave: false,
    saveUninitialized: false
}));


app.use(express.static(path.join(__dirname, 'public')));
app.use("/app", express.static(__dirname + "/app"));

// routes
require('./routes/routes')(app);
console.log(("Express server listening on port " + app.get('port')));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

server.listen(config.port);