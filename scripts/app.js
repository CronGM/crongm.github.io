'use strict';

var app = angular.module('BingoApp', [
	'ngRoute'
]);

app.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
	.when('/bingo', {
		controller: 'MainController',
		controllerAs: 'vm',
		templateUrl: 'views/main.html'
	})
	.when('/bingo/:conference/', {
		controller: 'BingoController',
		controllerAs: 'vm',
		templateUrl: 'views/bingo.html'
	})
	.when('/bingo/:conference/:cardCode', {
		controller: 'BingoController',
		controllerAs: 'vm',
		templateUrl: 'views/bingo.html'
	})
	.otherwise({
		redirectTo: '/bingo'
	});
}]);