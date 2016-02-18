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

exports.authenticate = function (req, res) {
	// Fetch value from client
	var name = req.body.name;
	name = name.replace(" ","_").toLowerCase();
	var password = req.body.password;
	var client = req.body.client;
	var admin;
	console.log("From request authenticate - client:" + client);
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

exports.getStatus = function (req, res) {
	// Fetch value from client
	console.log("From request getStatus started" );	
	var response = req.body.response;
	var password = req.body.password;
	var client = req.body.client;
	var token = req.body.token;
	//if(token){ 
	var admin;
	if(client == "voucher"){
		admin = false;
	}else{
		admin = true;
	}
	console.log("From request getStatus for id:" + password);
	console.log("From request getStatus token:" + token);
	console.log("From request getStatus response:" + response);
	//console.log("From request:" + password);
	// Set the headers
	var headers = {
	    'User-Agent':       'Super Agent/0.0.1',
	    'Content-Type':     'application/x-www-form-urlencoded',
	    'Access-Control-Allow-Origin':     'http://localhost:8090'
	};
	
	// Configure the request
	password ="56be83b9509ddea01d000001";
	//token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7Il9fdiI6ImluaXQiLCJwYXNzd29yZCI6ImluaXQiLCJuYW1lIjoiaW5pdCIsIl9pZCI6ImluaXQifSwic3RhdGVzIjp7ImRlZmF1bHQiOnt9LCJpbml0Ijp7Il9fdiI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsIm5hbWUiOnRydWUsIl9pZCI6dHJ1ZX0sIm1vZGlmeSI6e30sInJlcXVpcmUiOnt9fSwic3RhdGVOYW1lcyI6WyJyZXF1aXJlIiwibW9kaWZ5IiwiaW5pdCIsImRlZmF1bHQiXX19LCJpc05ldyI6ZmFsc2UsIl9tYXhMaXN0ZW5lcnMiOjAsIl9kb2MiOnsiX192IjowLCJwYXNzd29yZCI6IktpbGxlcjQ3NTQiLCJuYW1lIjoianAyIiwiX2lkIjoiNTZiZmFlMGRmODdhZGNmODBiMDAwMDAxIn0sIl9wcmVzIjp7InNhdmUiOltudWxsLG51bGwsbnVsbF19LCJfcG9zdHMiOnsic2F2ZSI6W119LCJpYXQiOjE0NTU3NTM4MzcsImV4cCI6MTQ1NTg0MDIzN30.J3Iuaku3kRpgVVHu5ONshi4fD8lwjA13RdhMemuK9PU";
    var options = {
        url: 'http://localhost:4006/api/users/'+password+'/circles/first?token='+token,
        method: 'GET',
        headers: headers
    };
    console.log("From request  getStatus- uri:" + options.url);    
    // Start the request
    request(options, function (error, response, body) {
    	if(error){
    		console.log("From request  getStatus- error:" + error);
    	}
        if (!error && response.statusCode == 200) {
            // Print out the response body
            console.log("From request getStatus - api body: " +body);
            //console.log("From request setup - api response: " +JSON.stringify(response));
            res.send(body);
        }
    });
	//}else{res.send("no token was there")}
};