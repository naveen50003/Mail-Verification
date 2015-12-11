var db	=	require('../models/employeeTable.js');
var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');
var mongoose = require('mongoose');
var auth = {
    auth: {
        api_key: 'key-c30200eed9880cbcf5f07aa0725146a0',
        domain: 'sandboxb54041ce3a43476a8e0a99c7836e96f1.mailgun.org'
    }
};
var _	=	{};

_.add	=	function(req,res){
	console.log("entered add method");
	var nodemailerMailgun = nodemailer.createTransport(mg(auth));
    var rand=Math.floor((Math.random() * 100) + 54);
	var employee	=	req.body;
	var Employee	=	new db.employeeModel();
	console.log("enter the Post All contacts");
	console.log(employee);
	Employee.email	=	req.body.email;
	Employee.username	=	req.body.username;
	Employee.phone	=	req.body.phone;
	Employee.verified	=	"not Verified";
	Employee.save(function(err,result){
		if(err){
			return;
		}
		console.log("server result");
		console.log(result);
		var link="http://localhost:5000/verify/"+result._id;
		nodemailerMailgun.sendMail({
			from: 'no-reply@local.com',
			to: req.body.email, // An array if you have multiple recipients.
			subject: 'Hey you, awesome!',
			'h:Reply-To': 'reply2this@company.com',
			//You can use "html:" to send HTML email content. It's magic!
			html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>",
			//You can use "text:" to send plain-text content. It's oldschool!
			text: 'Mailgun rocks, pow pow!'
		}, function (err, info) {
			if (err) {
				res.send(err);
			}
			else {
				console.log("mail send successFully");
				// res.send("Email sent"+info)
				
			}
		});
		res.json(result);
	})
	
};

_.editContact	=	function(req,res){
	
	var id = req.params.id;
	db.employeeModel.findById({_id: id}, function(err, result){

		if(err) {

			return;
		}
		res.json(result);
	});
}
_.update = function(req, res){

	var id = req.params.id;
	var employee = req.body;
	db.employeeModel.findById({_id: id}, function(err, result){

		if(err) {

			return;
		}

		result.email = employee.email;
		result.username = employee.username;
		result.phone = employee.phone;

		result.save(function(err, result){

			if(err) {

				return;
			}

			res.json(result);
		});
	})
};

_.remove = function(req, res){
	console.log("entered remove method");
	var user = req.params.user;

	db.employeeModel.findOne({username : user}, function(err, result){
		console.log("record find in Dlete method");
		if(err) {

			return;
		}
		console.log(result);
		if(result.verified	===	"not Verified"){
			res.send("Plz DO Email Verification");
		}
		else{
			res.send("Login Successfull");
		}
	})
};

_.getAllContacts = function(req, res) {
	
	console.log("enter the get All contacts");
	db.employeeModel.find(function(err, result){

		if(err) {

			return;
		}
	res.json(result);
	});
};

_.verifyEmail	=	function(req,res){
	
	console.log("email is verified Successfully");
	var id = req.params.id;
	// id	=	new mongoose.Types.ObjectId(id);
	console.log(id);
	db.employeeModel.findById(id, function(err, result){
		console.log("find record found");
		if(err) {
			console.log(err);
			return;
		}
		result.verified	=	"verified";
		console.log(result);
		result.save(function(err, result){
			console.log("enterd save method");
			if(err) {

				return;
			}
			console.log(result);
			res.send("Email verification Successfully");
		});
	})
	
	// res.end("<h1>Email "+mailOptions.to+" is been Successfully verified");
}
module.exports	=	_;