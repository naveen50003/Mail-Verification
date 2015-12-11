define([
	'../module'
],function(configModule){
	configModule.factory('CommonFactory',[
		'$http',
		'$q',
		function($http,$q){
			var _ = {};
			_.httpService = function(config) {

				var deferred = $q.defer();
				console.log("entered Common Factory");
				$http(config).then(function(response){
					console.log(response);
					var sendData	=	{
						"message"	:	"Success",
						"data"		:	response.data
					}
					// console.log(sendData);
					deferred.resolve(response.data);
				}, function(error){

					deferred.reject(error);
				});

				return deferred.promise;
			};
			return _;
		}
	])
})