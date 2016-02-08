// Author: Jean-Philippe Beaudet @ S3R3NITY Technology
// Voucherjs
// Version 0.0.1
	
(function($){
	
    /* BOOTSNIPP FULLSCREEN FIX */
    if (window.location == window.parent.location) {
        $('#back-to-bootsnipp').removeClass('hide');
    }
        
    $('[data-toggle="tooltip"]').tooltip();
    
    $('#fullscreen').on('click', function(event) {
        event.preventDefault();
        window.parent.location = "http://bootsnipp.com/iframe/4l0k2";
    });
    $('a[href="#cant-do-all-the-work-for-you"]').on('click', function(event) {
        event.preventDefault();
        $('#cant-do-all-the-work-for-you').modal('show');
    })
    
    $('[data-command="toggle-search"]').on('click', function(event) {
        event.preventDefault();
        $(this).toggleClass('hide-search');
        
        if ($(this).hasClass('hide-search')) {        
            $('.c-search').closest('.row').slideUp(100);
        }else{   
            $('.c-search').closest('.row').slideDown(100);
        }
    }); 

})(jQuery);

///setting variable avlues to default when logged off
document.getElementById('username').innerHTML = "<h1>Please sync your Facebook account too start Vouching !</h1>";

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
  } else if (response.status === 'not_authorized') {
    // The person is logged into Facebook, but not your app.
    document.getElementById('status').innerHTML = 'Please log ' +
      'into this app.';
  } else {
    // The person is not logged into Facebook, so we're not sure if
    // they are logged into this app or not.
    document.getElementById('status').innerHTML = 'Please log ' +
      'into Facebook.';
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
  appId      : '{your-app-id}',
  cookie     : true,  // enable cookies to allow the server to access 
                      // the session
  xfbml      : true,  // parse social plugins on this page
  version    : 'v2.2' // use version 2.2
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
  FB.api('/v2.0/me?fields=id,name,picture,cover,work,location,gender', function(response) {
    console.log('Successful login for: ' + response.name);
    //console.log('Response: ' + JSON.stringify(response));

    $('#profile_picture').attr("src",response.picture.data.url);
    $('#cover').attr("src",response.cover.source);
    document.getElementById('username').innerHTML = "<h1>"+response.name+"</h1>";
	document.getElementById('gender').innerHTML = "<p><strong> Gender :</strong><i>"+response.gender+"</i><p>";
	document.getElementById('location').innerHTML = "<p><strong> Location :</strong><i>"+response.location.name+"</i><p>";
	var index = 0;
	for(x in response.work){
	if (response.work[x].start_date[1] == undefined){
	index=x;
	continue;
	}
	}
	document.getElementById('work').innerHTML = "<p><strong> Work at :</strong><i>"+response.work[index].employer.name+"</i> since "+ response.work[index].start_date+"<p>";	   
  });
  
  // Here will go the friend dealing logics
  FB.api('/v2.0/me?fields=friendlists', function(response) {
	    console.log('Friend_list Response: ' + JSON.stringify(response)); 
	    var friends = new friendlist(response);
	    $('#friends').append(friends.response);
		$('#defaultfriend').hide();
	    if(response.friendlists.paging.next){
	    	$.get( response.friendlists.paging.next, function( data ) {
	    	});
	    }	    
  });
}
