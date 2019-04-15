'use strict';

app.controller('MainController', ['$scope', '$routeParams', 'localStorageService', function ($scope, $routeParams, localStorageService) {
	var vm = this;

	// Enable debug UI
	vm.debug = true;

	vm.hideTermsAlert = localStorageService.get('hideTerms') || false;

	vm.init = function () {
        // load links from local storage here
        var localNintendoCard = localStorageService.get('nintendo');
        var localPlaystationCard = localStorageService.get('playstation');
        var localXboxCard = localStorageService.get('xbox');
        var localGotCard = localStorageService.get('got');

        vm.nintendoCardCode = localNintendoCard || '';
        vm.playstationCardCode = localPlaystationCard || '';
        vm.xboxCardCode = localXboxCard || '';
        vm.gotCardCode = localGotCard || '';
		return;
	};

	vm.init();
}]);
