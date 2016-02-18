// Author: Jean-Philippe Beaudet @ S3R3NITY Technology
// Voucherjs
// Version 0.0.1

var index = require('../routes/index');

var express = require('express');
var api = require('../routes/api');

module.exports = function (app) {
	
	//Main routes
	///////////////////////////
	app.get('/', index.index);

	///api routes
	//////////////////////////////
	app.post('/authenticate',api.authenticate);
	app.post('/setup',api.setup);
	app.post('/getStatus',api.getStatus);	
	// error handlers
	/////////////////////////////////
	
	// development error handler
	// will print stacktrace
	if (app.get('env') === 'development') {
	    app.use(function(err, req, res, next) {
	        res.status(err.status || 500);
	        res.render('index/error', {
	            message: err.message,
	            error: err
	        });
	    });
	}

	// production error handler
	// no stacktraces leaked to user
	app.use(function(err, req, res, next) {
	    res.status(err.status || 500);
	    res.render('index/error', {
	        message: err.message,
	        error: {}
	    });
	});
};
