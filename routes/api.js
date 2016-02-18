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


exports.getStatus = function (req, res) {
	// Fetch value from client	
	var response = req.body.response;
	
	var name = req.body.name;
	var password = req.body.password;
	var client = req.body.client;
	var token = req.body.token;
	var _ID
	//if(token){ 
	var admin;
	if(client == "voucher"){
		admin = false;
	}else{
		admin = true;
	}
	console.log("From request getStatus for id:" + password);
	console.log("From request getStatus token:" + token);
	console.log("From request getStatus name:" + name);
	console.log("From request getStatus response:" + response);
	var friends = response.replace("[","").replace("]","").split(",");
	console.log("From request getStatus friends:" + friends);
	//console.log("From request getStatus response:" + response.replace("[","").replace("]","").split("},{"));
	//console.log("From request:" + password);
	// Set the headers
	var headers = {
	    'User-Agent':       'Super Agent/0.0.1',
	    'Content-Type':     'application/x-www-form-urlencoded',
	    'Access-Control-Allow-Origin':     'http://localhost:8090'
	};
	// Configure the request first request to fetch the userId then place it in the session object
    var options = {
            url: 'http://localhost:4006/api/users/'+name+'/getId?token='+token,
            method: 'GET',
            headers: headers
        };
    //console.log("From request  getIdByName - uri:" + options.url);
    // Start the first request
    request(options, function (error, response, body) {
    	if(error){
    		console.log("From request  getIdByName - error:" + error);
    	}
        if (!error && response.statusCode == 200) {
            // Print out the response body
            //console.log("From request getIdByName - api body: " +body);
            //console.log("From request setup - api response: " +JSON.stringify(response));
            _ID = body.replace(/\"/g,"");
	
            // Configure the request second request to fetch the user's first circles voucher
            console.log("From request getIdByName _ID: " +_ID);
            var options = {
            		url: 'http://localhost:4006/api/users/'+_ID+'/circles/first?token='+token,
            		method: 'GET',
            		headers: headers
            };
            //console.log("From request  getStatus- uri:" + options.url);    
            // Start the second request
            request(options, function (error, response, body) {
            	if(error){
            		console.log("From request  getStatus- error:" + error);
            	}
            	if (!error && response.statusCode == 200) {
            		// Print out the response body
            		//console.log("From request getStatus - api body: " +body);
            		//console.log("From request setup - api response: " +JSON.stringify(response));
            		res.send(body);
            	}
            });
        }
    });
	//}else{res.send("no token was there")}
};