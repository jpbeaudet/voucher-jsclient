var rpc = require('json-rpc2');


var client = rpc.Client.$create(8008, '163.172.5.251');
 
// Call add function on the server
// TODO : add a setTimout that refreshes the data and then send it to mongo
// TODO : add the necessary call to get_results_for_project
if(client){ 
	console.log("client is running");
client.call('has_project', ["test_project"], function(err, result) {
	if (err){
		console.log(err);
	}
    console.log("result =" + result);
});
}