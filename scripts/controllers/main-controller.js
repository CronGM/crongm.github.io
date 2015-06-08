'use strict';

app.controller('MainController', ['$scope', '$routeParams', function ($scope, $routeParams) {
	var vm = this;

	vm.validConferences = ['nintendo', 'playstation', 'xbox'];

	vm.conference = $routeParams.conference || '';
	vm.cardCode = $routeParams.cardCode || '';

	vm.card = [
		{
			id: 'a',
			imageUrl: 'http://placevaughnandfranco.it/img/250/250',
			message: 'Texto de la casilla'
		}
	];

	vm.init = function () {
		// Handle missing route parameters
		if (vm.conference == '') {
			vm.conference = vm.validConferences[Math.floor(Math.random() * 3)];
		};
		if (vm.cardCode == '') {
			vm.generateCardCode();
		};
		vm.readCardCode();
	}

	vm.getNumber = function(num) {
        return new Array(num);   
    }

    vm.generateCardCode = function () {
    	vm.cardCode = "";
    	var chars="abcdefghijklmnopqrstuvwyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    	var indexOut = 0;
    	for (var i = 0; i < 24; i++) {
    		indexOut = Math.floor(Math.random() * chars.length);
    		vm.cardCode += chars[indexOut];
    		chars = strSplice(chars, indexOut, 1);
    	};
    	vm.cardCode = strSplice(vm.cardCode, 12, 0, 'x');
    }

    vm.readCardCode = function (cardCode) {
    	vm.cardCode = $routeParams.cardCode;
    	// Check that code has exactly 24 characters
    	// If valid length, check that code is valid having no duplicate or strange characters 
    	// If valid code insert middle slot in card
    	vm.cardCode = strSplice(vm.cardCode, 12, 0, 'x');
    	// Print card with the supplied cardCode
    }

    // Emulates Splice on strings.
	function strSplice(str, index, count, add) {
		return str.slice(0, index) + (add || "") + str.slice(index + count);
	}

	vm.init();
}]);