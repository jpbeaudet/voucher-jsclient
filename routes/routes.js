// Author: Jean-Philippe Beaudet @ S3R3NITY Technology
// 
//

var index = require('../routes/index');

var express = require('express');


module.exports = function (app) {
	
	//Main routes
	///////////////////////////
	app.get('/', index.index);

	
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
