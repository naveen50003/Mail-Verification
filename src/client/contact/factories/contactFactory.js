define([
	'../module'
],function(configModule){
	configModule.factory('contactFactory',[
		'$http',
		'CommonFactory',
		function($http,CommonFactory){
			var _	=	{};
			_.addEmployeeData	=	function(data){
				console.log(data);
				return CommonFactory.httpService({
					method: 'POST',
					url: '/employeelist',
					data: data
				})
			};
			_.getEmployeeList	=	function(){
				console.log("entered employee list");
				return	CommonFactory.httpService({
					method: 'GET',
					url: '/employeelist'
				})
			};
			_.removeEmployee	=	function(user){
				
				return CommonFactory.httpService({
					method:'DELETE',
					url:'/employeelist/'+user
				})
			};
			_.editEmployee	=	function(id){
				
				return CommonFactory.httpService({
					method: 'GET',
					url: '/employeelist/'+id
				})
			};
			_.updateEmployee	=	function(id,data){
				
				return CommonFactory.httpService({
					method: 'PUT',
					url: '/employeelist/'+ id,
					data: data
				})
			};
			return _;
			
		}
	])
})