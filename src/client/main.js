require.config({
	baseUrl :	'../src/client/',
	paths	:	{
		'angular'	:	'../../vendor/angular/angular.min'
	},
	shim	:	{
		'angular'	:	{
			exports	:	'angular'
		}
	},
	deps	:	[
		'bootstrap'
	]
})