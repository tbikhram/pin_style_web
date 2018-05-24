//framework
var express = require('express');
var bodyParser = require('body-parser');
//http request logger middleware for node.js
var morgan = require('morgan');
//data base package will be using
var mongoose = require('mongoose');
//view engine
var ejs = require('ejs');
var engine = require('ejs-mate')
//upload the file to the server
var fileUpload = require('express-fileupload');
//initlaizing express object
var app = express();
//conntecting to mongoose DB and checking for error 
//here you will place the root and pass from mLab created DB
mongoose.connect('mongodb://root:123456@ds231740.mlab.com:31740/pin',function(err){
	if(err){
		console.log(err);
	}else{
		console.log('connected to db')
	}
})

//middleware 
app.use(fileUpload());
//this will connect with public path/folder for all css that is being called 
app.use(express.static(__dirname + '/public'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(morgan('dev'));


require('./routes/main')(app);
//can call; the pins page
require('./routes/pins')(app);

//open the server that will be used to open the page
app.listen(8090,function(err){
	if(err){
		console.log(err);
	}else {
		console.log('connecte to Port 8090')
	}
})