'use strict';

app.controller('BingoController', ['$scope', '$routeParams', function ($scope, $routeParams) {
	var vm = this;

	// Enable debug UI
	vm.debug = true;

	vm.validConferences = ['nintendo', 'playstation', 'xbox'];

	vm.conference = $routeParams.conference || '';
	vm.cardCode = $routeParams.cardCode || '';
	vm.isCodeValid = false;

	vm.cardPool = [
		{
			id: 'a',
			imageUrl: 'http://placevaughnandfranco.it/img/250/250',
			message: 'A'
		},
		{
			id: 'b',
			imageUrl: 'http://placevaughnandfranco.it/img/250/250',
			message: 'B'
		},
		{
			id: 'c',
			imageUrl: 'http://placevaughnandfranco.it/img/250/250',
			message: 'C'
		},
		{
			id: 'x',
			imageUrl: 'http://placevaughnandfranco.it/img/250/250',
			message: 'X'
		}
	];

	vm.init = function () {
		// Handle missing route parameters
		if (vm.conference == '') {
			vm.conference = vm.validConferences[Math.floor(Math.random() * 3)];
		}
		if (vm.cardCode == '') {
			vm.generateCardCode();
		}
		else {
			vm.readCardCode();
		};

		vm.cardLogoUrl = 'images/logo_' + vm.conference + '.png';

		vm.drawCard();

		return;
	};

	vm.getNumber = function(num) {
        return new Array(num);
    };

    vm.generateCardCode = function () {
    	vm.cardCode = "";
    	var chars="abcdefghijklmnopqrstuvwyzABCDEFGHIJKLMNOP";
    	var indexOut = 0;
    	for (var i = 0; i < 24; i++) {
    		indexOut = Math.floor(Math.random() * chars.length);
    		vm.cardCode += chars[indexOut];
    		chars = strSplice(chars, indexOut, 1);
    	};

    	vm.cardCode = strSplice(vm.cardCode, 12, 0, 'x');

    	return;
    };

    vm.readCardCode = function () {
    	var codePattern = /^(?:([A-Za-z])(?!.*\1))*$/;

    	// Check that conference parameter is valid
    	if (vm.validConferences.indexOf(vm.conference) == -1) {
    		// TODO: Show conference error message
    		console.log("conference error");
			vm.conference = vm.validConferences[Math.floor(Math.random() * 3)];
    		return;
    	}
    	
    	// If valid conference, check that code has exactly 24 characters
    	// If not, generate valid code
    	if (vm.cardCode.length != 24) {
    		// TODO: Show cardCode error message
    		console.log("length error");
			vm.generateCardCode();
			return;
    	}
    	
		// If valid length, check that code is valid having no duplicate or strange characters
    	// If not, generate valid code
    	if (!codePattern.test(vm.cardCode)) {
    		// TODO: Show cardCode error message
    		console.log("pattern error");
    		vm.generateCardCode();
    		return;
    	};
    	
    	// If valid code insert middle slot in card
    	vm.cardCode = strSplice(vm.cardCode, 12, 0, 'x');

    	vm.isCodeValid = true;

    	return;
    };

    vm.drawCard = function () {
    	vm.card = {};

    	// TODO Load the cards from JSON into card pool

    	// First, create the slots map
    	var cardMap = {}
    	for (var i = 0; i < vm.cardPool.length; i++) {
    		cardMap[vm.cardPool[i].id] = vm.cardPool[i];
    	};

    	var code = 'abccbaxacbac';
    	// for (var i = 0; i < vm.cardCode.length; i++) {
    		// vm.card[i] = cardMap[vm.cardCode[i]];
    	for (var i = 0; i < code.length; i++) {
    		vm.card[i] = cardMap[code[i]];
    	};
    };

    // Emulates Splice on strings.
	function strSplice(str, index, count, add) {
		return str.slice(0, index) + (add || "") + str.slice(index + count);
	};

	vm.init();
}]);