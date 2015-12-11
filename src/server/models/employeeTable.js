var mongoose	=	require('mongoose'),
	Schema	=	mongoose.Schema;
	
var Employee	=	Schema({
	email	:	{
		type : String,
		required	:	true
	},
	username	:	{
		type : String,
		required	:	true
	},
	phone	:	{
		type : String,
		required	:true
	},
	verified	:{
		type	:	String,
		required	:	true
	}
});

var employeeModel	=	mongoose.model('employee',Employee);

module.exports	=	{
	employeeModel	:	employeeModel
}