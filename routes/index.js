// Author: Jean-Philippe Beaudet @ S3R3NITY Technology
// 
// Here will go all the function linked to the routes. It will transmit refreshed data object to jade templates 

var mongoose = require('mongoose');
var rpc = require('json-rpc2');
var path = require('path');
var mime = require('mime');
var fs = require("fs");
//var client = rpc.Client.$create(8008, '163.172.5.251'); // server


exports.index = function (req, res) {
    var data = {
        title: " Voucher Dev Platform"

    };
    res.render('index/index', data);
};

