//loading modules
var express = require('express'),
	// path = require('path'),
	// fs = require('fs'),
	mongoose = require('mongoose'),
	port = process.env.PORT || 5000;
var app = express();
var employee	=	require('./src/server/controllers/employeeList.js');	
 //To connect to the DB use mongojs
// var mongojs = require('mongojs');
// var db = mongojs('employeelist', ['employee']);

//To get the data from the user requested URL
var bodyParser = require('body-parser');
app.use(bodyParser.json());

/////////////////////////////////////////////////
// Connect to MongoDb 
/////////////////////////////////////////////////
var mognoDbUrl = "mongodb://localhost:27017/contactlist";
mongoose.connect(mognoDbUrl, function(err, result){

	if(err) {

		console.log("Connection failure to the url:", mognoDbUrl);
		return;
	}

	console.log("Connection successful to the url: ", mognoDbUrl);
});
//To load the static files like .html, .css, .js and images, etc,..
app.use(express.static(__dirname));
app.post('/employeelist', employee.add);
app.get('/employeelist',employee.getAllContacts);
app.get('/employeelist/:id',employee.editContact);
app.put('/employeelist/:id',employee.update);
app.get('/verify/:id',employee.verifyEmail);
app.delete('/employeelist/:user',employee.remove);
app.listen(port,function(){
	console.log("Server running at http://localhost:"+port);
});
