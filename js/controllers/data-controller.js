'use strict';

app.controller('dataController', ['$scope', 'localStorageService', '$location', '$window', function ($scope, localStorageService, $location, $window) {
	var vm = this;

	vm.hideTermsAlert = localStorageService.get('hideTerms') || false;

	vm.dismissTermsAlert = function () {
		localStorageService.set('hideTerms', true);
	}

    vm.deleteAllData = function () {
		localStorageService.clearAll();
        $window.location.assign('/');
	}
}]);