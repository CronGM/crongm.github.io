'use strict';

angular
  .module('BingoApp', [
    'ngRoute',
    'LocalStorageModule'
  ])
  .constant('flagDebugMode', false)
  .constant('flagSaveState', false)
  .config(['localStorageServiceProvider', function (localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('dcbingo');
  }])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/bingo', {
        templateUrl: 'views/main.html'
      })
      .when('/bingo/:conference/', {
        controller: 'BingoController',
        controllerAs: 'vm',
        templateUrl: 'views/bingo.html'
      })
      .when('/bingo/:conference/:cardCode/:shared', {
        controller: 'BingoController',
        controllerAs: 'vm',
        templateUrl: 'views/bingo.html'
      })
      .when('/rules', {
        templateUrl: 'views/rules.html'
      })
      .when('/about', {
        templateUrl: 'views/about.html'
      })
      .otherwise({
        redirectTo: '/bingo'
      });
  }]);

  // TODO: Create feature flag service
