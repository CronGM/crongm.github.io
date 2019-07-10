'use strict';

angular
	.module('BingoApp')
  .controller('MainController', MainController);

MainController.$inject = ['$scope', 'flagDebugMode', 'localStorageService', '$window',];
function MainController($scope, flagDebugMode, localStorageService, $window) {
  var vm = this;

  // Enable debug UI
  vm.debug = flagDebugMode;

  // TODO: Implement easy modification/localization
  vm.schedules = {
    "nintendo": {
      date: '2021 (MX)',
      time: 'Pending'
    },
    "playstation": {
      date: '2021 (MX)',
      time: 'Pending'
    },
    "xbox": {
      date: '2021 (MX)',
      time: 'Pending'
    }
  };

  vm.hideTermsAlert = localStorageService.get('hideTerms') || false;

  vm.dismissTermsAlert = function () {
    localStorageService.set('hideTerms', true);
  }

  vm.deleteAllData = function () {
    localStorageService.clearAll();
    $window.location.assign('/');
  }
}
