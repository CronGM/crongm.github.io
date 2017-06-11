'use strict';

app.controller('BingoController', ['$scope', '$routeParams', 'cards', 'localStorageService', '$location', function ($scope, $routeParams, cards, localStorageService, $location) {
	var vm = this;
	var validConferences = ['nintendo', 'playstation', 'xbox'];
	var getCardPool = cards.getPool($routeParams);

	// Enable debug UI
	vm.debug = false;

	// TODO: Implement for easy modification/localization
	vm.schedules = {
		"nintendo": 'Martes 13 de Junio, 11:00 AM (MX)',
		"playstation": 'Lunes 12 de Junio, 8:00 PM (MX)',
		"xbox": 'Lunes 11 de Junio, 04:00 PM (MX)'
	};

	vm.conference = $routeParams.conference || '';
	vm.cardCode = localStorageService.get(vm.conference) || '';
	vm.isCodeValid = false;
	vm.urlHost = $location.host();

	vm.cardPool = [];

    vm.generateCardCode = function () {
    	// var chars="abcdefghijklmnopqrstuvwyzABCDEFGHIJKLMNOP";
    	var chars="abcdefghijklmnopqrstuvwyz";
    	var indexOut = 0;
    	for (var i = 0; i < 24; i++) {
    		indexOut = Math.floor(Math.random() * chars.length);
    		vm.cardCode += chars[indexOut];
    		chars = strSplice(chars, indexOut, 1);
    	};

    	// Save to local storage
    	localStorageService.set(vm.conference, vm.cardCode);
		vm.shareCode = vm.cardCode;
    	vm.cardCode = strSplice(vm.cardCode, 12, 0, 'x');

    	vm.isCodeValid = true;

    	return;
    };

    var readCardCode = function () {
		// Checks that no card is repeated
    	var codePattern = /^(?:([A-Za-z])(?!.*\1))*$/;

    	// If valid conference, check that code has exactly 24 characters
    	// If not, generate valid code
    	if (vm.cardCode.length != 24) {
    		// TODO: Show cardCode error message
    		console.log("length error");
			return;
    	}
    	
		// If valid length, check that code is valid having no duplicate or strange characters
    	// If not, generate valid code
    	if (!codePattern.test(vm.cardCode)) {
    		// TODO: Show cardCode error message
    		console.log("pattern error");
    		return;
    	};
    	
    	vm.shareCode = vm.cardCode;
    	// If valid code insert middle slot in card
    	vm.cardCode = strSplice(vm.cardCode, 12, 0, 'x');

    	vm.isCodeValid = true;

    	return;
    };

    var drawCard = function () {
    	// Load the cards from JSON into card pool
    	getCardPool.then(function (response) {
    		console.log("SUCCESS SERVICE: " + vm.conference);
    		vm.cardPool = response;

	    	// First, create the slots map
	    	var cardMap = {}
	    	for (var i = 0; i < vm.cardPool.length; i++) {
	    		cardMap[vm.cardPool[i].id] = vm.cardPool[i];
	    	};

	    	// var code = 'zABCDEFGHIJKxLMNOPrstuvwy';

	    	var numberOfSlots = 25; // code.length;
	    	var cardIndex = 0;
	    	var rowIndex = 0;
	    	while (cardIndex < numberOfSlots) {
	    		var cardRow = new rowTemplate();
	    		for (var i = 0; i < 5; i++) {
	    			cardRow.slots[i] = cardMap[vm.cardCode[cardIndex]];
		    		cardIndex += 1;
	    		};
	    		vm.card.rows[rowIndex] = cardRow;
	    		rowIndex += 1;
	    	}
    	});

    	// cards.success(function (data) {
    	// 	console.log("SUCCESS SERVICE: " + vm.conference);
    	// 	vm.cardPool = data;

	    // 	// First, create the slots map
	    // 	var cardMap = {}
	    // 	for (var i = 0; i < vm.cardPool.length; i++) {
	    // 		cardMap[vm.cardPool[i].id] = vm.cardPool[i];
	    // 	};

	    // 	var code = 'abcdefghijkl';

	    // 	var numberOfSlots = code.length; //25;
	    // 	var cardIndex = 0;
	    // 	var rowIndex = 0;
	    // 	while (cardIndex < numberOfSlots) {
	    // 		var cardRow = new rowTemplate();
	    // 		for (var i = 0; i < 5; i++) {
	    // 			cardRow.slots[i] = cardMap[code[cardIndex]];
		   //  		cardIndex += 1;
	    // 		};
	    // 		vm.card.rows[rowIndex] = cardRow;
	    // 		rowIndex += 1;
	    // 	}
    	// });

    };

	// TODO: This could be moved to a directive
	var init = function () {
		console.log("INIT BINGO CONTROLLER");
		vm.cardPool = [];
		vm.card = {
    		"rows": []
    	};

    	// Check that conference parameter is valid
    	if (validConferences.indexOf(vm.conference) == -1) {
    		// TODO: Show conference error message
    		console.log("conference error");
			// vm.conference = validConferences[Math.floor(Math.random() * 3)];
    		return;
    	}
    	else {
			if ($routeParams.shared) {
				vm.isSharedCode = $routeParams.shared;
				vm.cardCode = $routeParams.cardCode;
			}

			// if (vm.conference == '') {
			// 	vm.conference = validConferences[Math.floor(Math.random() * 3)];
			// }
			// Handle missing route parameters
			if (vm.cardCode) {
				readCardCode();
			}
			else {
				vm.generateCardCode();
			};

			if (vm.isCodeValid) {
				vm.cardLogoUrl = 'images/logo_' + vm.conference + '.png';
				drawCard();
			};

			return;
    	}
	};

    //--- HELPERS

	// vm.getNumber = function(num) {
    //     return new Array(num);
    // };

    // Emulates Splice on strings.
	function strSplice(str, index, count, add) {
		return str.slice(0, index) + (add || "") + str.slice(index + count);
	};

	function rowTemplate () {
		this.slots = [];
	}

	init();
}]);