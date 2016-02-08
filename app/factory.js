// Author: Jean-Philippe Beaudet @ S3R3NITY Technology
// Voucherjs
// Version 0.0.1
// HTML factory for voucherjs

function friendlist(request){
	this.response ="";
	var snippet = new Array();
    for(x in request.friendlists.data){
    snippet.push('<li class="list-group-item"><div class="col-xs-12 col-sm-3"><img src="http://api.randomuser.me/portraits/men/49.jpg" alt="Scott Stevens" class="img-responsive img-circle"/></div><div class="col-xs-12 col-sm-9"><i class="fa fa-facebook"></i>&nbsp&nbsp<div class="top_right"> <a href="#" class="btn btn-sm btn-primary">Vouch !</a></div><span class="name">Scott Stevens</span><br/><i>'+request.friendlists.data[x].id+ '</i> <label class="btn btn-success btn-circle"> 12 </label>&nbsp<label class="btn btn-warning btn-circle"> 4 </label>&nbsp<label class="btn btn-danger btn-circle"> 234 </label></div><div class="clearfix"></div></li>');	
    }
	this.response = snippet.join(['']);
}