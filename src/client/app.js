define([
	'angular',
	'common/moduleLoader',
	'contact/moduleLoader'
],function(angular){
	return angular.module('he',['he.common','he.contact']);
})