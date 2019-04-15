'use strict';

var app = angular.module('BingoApp', [
	'ngRoute',
	'LocalStorageModule'
]);

app.config(['localStorageServiceProvider', function (localStorageServiceProvider) {
	localStorageServiceProvider.setPrefix('dcbingo');
}]);

app.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
	.when('/bingo', {
		controller: 'MainController',
		controllerAs: 'vm',
		// templateUrl: 'views/main.html'
		templateUrl: 'views/got/main.html'
	})
	.when('/bingo/:conference/', {
		controller: 'BingoController',
		controllerAs: 'vm',
		templateUrl: 'views/got/bingo.html'
	})
	// .when('/bingo/:conference/:cardCode/:shared', {
	// 	controller: 'BingoController',
	// 	controllerAs: 'vm',
	// 	templateUrl: 'views/bingo.html'
	// })
	.when('/rules', {
		templateUrl: 'views/got/rules.html'
	})
	.when('/about', {
		templateUrl: 'views/about.html'
	})
	.otherwise({
		redirectTo: '/bingo'
	});
}]);
