'use strict';

app.controller('MainController', ['$scope', '$routeParams', 'localStorageService', function ($scope, $routeParams, localStorageService) {
	var vm = this;

	// Enable debug UI
	vm.debug = true;

	vm.init = function () {
        // load links from local storage here
        var localNintendoCard = localStorageService.get('nintendo');
        var localPlaystationCard = localStorageService.get('playstation');
        var localXboxCard = localStorageService.get('xbox');

        vm.nintendoCardCode = localNintendoCard || '';
        vm.playstationCardCode = localPlaystationCard || '';
        vm.xboxCardCode = localXboxCard || '';
		return;
	};

	vm.init();
}]);