// Author: Jean-Philippe Beaudet @ S3R3NITY Technology
// 
// Here will go all the function linked to the routes. It will transmit refreshed data object to jade templates 
var request = require('request');



exports.authenticate = function (req, res) {
	// Fetch value from client
	var name = req.body.name;
	name = name.replace(" ","_").toLowerCase();
	var password = req.body.password;
	var client = req.body.client;
	var admin;
	if(client == "voucher"){
		admin = false;
	}else{
		admin = true;
	}
	console.log("From request authenticate - name:" + name);
	console.log("From request authenticate - passowrd:" + password);
	// Set the headers
	var headers = {
	    'User-Agent':       'Super Agent/0.0.1',
	    'Content-Type':     'application/x-www-form-urlencoded',
	    'Access-Control-Allow-Origin':     'http://localhost:8090'
	};
	
	// Configure the request
    var options = {
        url: 'http://localhost:4006/api/authenticate',

        method: 'POST',
        headers: headers,
        form:{name: name, password: password,admin:admin}

    };
     
    // Start the request
    request(options, function (error, response, body) {
    	if(error){
    		//console.log("From request authenticate - error:" + error);
    	}
        if (!error && response.statusCode == 200) {
            // Print out the response body
            //console.log("From request authenticate - api body: " +body);
            //console.log("From request authenticate - api response: " +JSON.stringify(response));
            res.send(body);
        }
    });
       
};

exports.setup = function (req, res) {
	// Fetch value from client
	var name = req.body.name;
	name = name.replace(" ","_").toLowerCase();
	var password = req.body.password;
	var client = req.body.client;
	var admin;
	if(client == "voucher"){
		admin = false;
	}else{
		admin = true;
	}
	//console.log("From request:" + name);
	//console.log("From request:" + password);
	// Set the headers
	var headers = {
	    'User-Agent':       'Super Agent/0.0.1',
	    'Content-Type':     'application/x-www-form-urlencoded',
	    'Access-Control-Allow-Origin':     'http://localhost:8090'
	};
	
	// Configure the request
    var options = {
        url: 'http://localhost:4006/api/setup',
        method: 'POST',
        headers: headers,
        form:{name: name, password: password,admin:admin}
    };
     
    // Start the request
    request(options, function (error, response, body) {
    	if(error){
    		//console.log("From request setup - error:" + error);
    	}
        if (!error && response.statusCode == 200) {
            // Print out the response body
            //console.log("From request setup - api body: " +body);
            //console.log("From request setup - api response: " +JSON.stringify(response));
            res.send(body);
        }
    });
    
};