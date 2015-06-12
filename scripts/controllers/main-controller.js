'use strict';

app.controller('MainController', ['$scope', '$routeParams', function ($scope, $routeParams) {
	var vm = this;

	// Enable debug UI
	vm.debug = true;

	vm.init = function () {
        // load links from local storage here
        vm.nintendoCard = '';
        vm.playstationCard = '';
        vm.xboxCard = '';
		return;
	};

	vm.init();
}]);