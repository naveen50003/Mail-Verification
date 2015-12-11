define([
	'../module',
], function(configModule) {
	configModule.controller('EmployeeListController', [
		'$scope',
		'contactFactory',
		function($scope, contactFactory){

		//Employee list display in the HTML
		$scope.employeelist = '';
		$scope.message='';
		$scope.messageDisplay	= false;
		console.log("I am in controller");
		//Employee data
		$scope.employee = '';

		$scope.addContact = function(){

			console.log($scope.employee);
			var response = contactFactory.addEmployeeData($scope.employee);
			response.then(function(data){
				
				console.log("Contact added successfully...");
				$scope.employee = '';
			});			
		};

		//Remove Contact
		$scope.removeEmployee = function(user){

			var response = contactFactory.removeEmployee(user);
			response.then(function(data){
				console.log(data);
				$scope.message	=	data;
				$scope.messageDisplay	= true;
				console.log($scope.message);
				console.log("Employee Entered for login phase");
			});
		};
	//Clear text feilds
		$scope.clearTextFields = function(){

			$scope.employee = '';
		};
	}]);
	
});