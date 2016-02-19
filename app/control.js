// Author: Jean-Philippe Beaudet @ S3R3NITY Technology
// Voucherjs
// Version 0.0.1
var _TOKEN;	
var _NAME;
var _ID;
(function($){
	    
    ///// Buttons sections
    /////////////////////////////////////////////////////////
    
    // sync your facebook info
    
    $('#sync_your_facebook').on('click', function(event) {
    	info = document.getElementById('info');
    	info_en = '<div class="alert alert-info" id="info" role="alert" style="margin-top:20px;"><button type="button" aria-label="Left Align" style="border:none;margin-bottom:10px;" id="remove_info" href="#"><span class="glyphicon glyphicon-remove" aria-hidden="true" style="align:top;"></span></button><h4> Synchronise your Facebook</h4> <p> You must synchronise your facebook account for the application to allow you to start vouching. Simply click the button "sync your facebook", accept to give the required permissions and then start Vouching rigth away! </p></div>';
    	if(info != null){
    		$(info).hide( "slow", function() {
		     });
    	}
		$('#info_placeholder').prepend(info_en);
    	$(this).hide( "slow", function() {
	     });; 
        $('#remove_info').on('click', function(event) {
        	console.log("pouf");
        	info = document.getElementById('info');
        	$('#info').remove();
        	$('#sync_your_facebook').show();
        });
    });

})(jQuery);

///setting variable avlues to default when logged off
document.getElementById('username').innerHTML = "<h1> Sync your Facebook account and start Vouching !</h1>";

// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
	$('#fblogin').hide();
    voucherAPI();
  }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
  FB.getLoginStatus(function(response) {

    statusChangeCallback(response); 
  });
}

window.fbAsyncInit = function() {
FB.init({
  appId      : '159512431094694',
  cookie     : true,  // enable cookies to allow the server to access 
                      // the session
  xfbml      : true,  // parse social plugins on this page
  version    : 'v2.5' // use version 2.5
});

// Now that we've initialized the JavaScript SDK, we call 
// FB.getLoginStatus().  This function gets the state of the
// person visiting this page and can return one of three states to
// the callback you provide.  They can be:
//
// 1. Logged into your app ('connected')
// 2. Logged into Facebook, but not your app ('not_authorized')
// 3. Not logged into Facebook and can't tell if they are logged into
//    your app or not.
//
// These three cases are handled in the callback function.

FB.getLoginStatus(function(response) {
  statusChangeCallback(response);
});

};

// Load the SDK asynchronously
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// VoucherApi
// Here will go all the call for the HTMLfactory
////////////////////////////////////////////////
function voucherAPI() {
  console.log('Welcome!  Fetching your information.... ');
  // Fetch profile information for intial jquery setup
  FB.api('/v2.0/me?fields=friendlists,id,name,picture,cover,work,location,gender', function(response) {
    console.log('Successful login for: ' + response.name);
    console.log('Facebook API Response: ' + JSON.stringify(response));
    $('#profile_picture').attr("src",response.picture.data.url);
    $('#cover').attr("src",response.cover.source);
    document.getElementById('username').innerHTML = "<h1>"+response.name+"</h1>";
	document.getElementById('gender').innerHTML = "<p><strong> Gender : </strong><i> "+response.gender+"</i></p>";
	document.getElementById('location').innerHTML = "<p><strong> Location : </strong><i> "+response.location.name+"</i></p>";
	document.getElementById('facebook').innerHTML = '<a href="https://facebook.com/"'+response.id+'><i> https://facebook.com/'+ response.id+ '</i></a><br>';	
	var index = 0;
	for(x in response.work){
	if (response.work[x].start_date[1] == undefined){
	index=x;
	continue;
	}
	}
	_NAME = response.name.toLowerCase().replace(" ","_");
	//log to voucher api to retrieve the token
	$.post( '/authenticate',{"name": response.name,"password":response.id,"client":"voucher"})	
	.done (function( data ) {
	console.log("Voucher API response for authenticate:" +JSON.stringify(data));

	var _dt = JSON.parse(data)
	console.log("Voucher API _TOKEN is authenticated:" +_dt.token);
	_TOKEN = _dt.token;
	console.log("Voucher API response for authenticate:" +_dt.success);
	if (_dt.success == false){
		 //if not registered register
		$.post( '/setup',{"name": response.name,"password":response.id,"client":"voucher"})	
		.done (function( data ) { 
			console.log("Voucher API response for setup:" +JSON.stringify(data));
			_TOKEN = data.token;
			});		
	}	
	document.getElementById('work').innerHTML = "<p><strong> Work at : </strong><i> "+response.work[index].employer.name+"</i> since "+ response.work[index].start_date+"<p>";	   
 
	// Here will go the friend dealing logics
	console.log('Friend_list Response: ' + JSON.stringify(response.friendlists));
	console.log('Friend_list response.friendlists.data: ' + JSON.stringify(response.friendlists.data));
	var friends = new Array();
	for(x in response.friendlists.data){
	    friends.push(response.friendlists.data[x].id);
	}
	console.log('friends array: ' + JSON.stringify(friends));
	//console.log("Voucher API token to send:" +_TOKEN);
	$.post( '/getStatus',{"response" : JSON.stringify(friends), "client":"voucher","token":_TOKEN,"name": _NAME, "password" : response.id})	
	.done (function( data ) { 
		console.log("Voucher API response for current status results:" +JSON.stringify(data));
		});
	    
	// send the curated response object the the status object to the HTML factory
	// TODO: add the status object to the HTMLfactory constructor
    
	// TODO: add the description and name to snippet
	var factory = new HTMLfactory(response);
	$('#friends').append(factory.friends);
	$('#defaultfriend').hide();
	if(response.friendlists.paging.next){
	    // if there was another page of friends 
	    // TODO: add a snippet to follow page or scrollable div to contaain all friends
	    $.get( response.friendlists.paging.next, function( data ) {
	    });
	}
});// end of authenticate
});// end of facebook response
}
