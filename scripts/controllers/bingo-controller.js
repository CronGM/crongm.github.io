'use strict';

app.controller('BingoController', ['$scope', '$routeParams', 'cards', 'localStorageService', function ($scope, $routeParams, cards, localStorageService) {
	var vm = this;

	// Enable debug UI
	vm.debug = true;

	vm.validConferences = ['nintendo', 'playstation', 'xbox'];
	vm.schedules = {
		"nintendo": 'Lunes 16 de Junio, 11:00 AM',
		"playstation": 'Lunes 15 de Junio, 8:00 PM',
		"xbox": 'Lunes 15 de Junio, 11:30 AM'
	};

	vm.conference = $routeParams.conference || '';
	vm.cardCode = $routeParams.cardCode || '';
	vm.isSharedCode = $routeParams.shared || false;
	vm.isCodeValid = false;

	vm.cardPool = [];
	vm.getCardPool = cards.getPool($routeParams);


	vm.init = function () {
		console.log("INIT BINGO CONTROLLER");
		vm.cardPool = [];
		vm.card = {
    		"rows": []
    	};

    	// Check that conference parameter is valid
    	if (vm.validConferences.indexOf(vm.conference) == -1) {
    		// TODO: Show conference error message
    		console.log("conference error");
			// vm.conference = vm.validConferences[Math.floor(Math.random() * 3)];
    		return;
    	}
    	else {
			// if (vm.conference == '') {
			// 	vm.conference = vm.validConferences[Math.floor(Math.random() * 3)];
			// }
			// Handle missing route parameters
			if (vm.cardCode == '') {
				vm.generateCardCode();
			}
			else {
				vm.readCardCode();
			};

			if (vm.isCodeValid) {
				vm.cardLogoUrl = 'images/logo_' + vm.conference + '.png';
				vm.drawCard();
			};

			return;
    	}
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

    	// Save to local storage
    	localStorageService.set(vm.conference, vm.cardCode);
    	vm.cardCode = strSplice(vm.cardCode, 12, 0, 'x');

    	vm.isCodeValid = true;

    	return;
    };

    vm.readCardCode = function () {
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

    vm.drawCard = function () {
    	// Load the cards from JSON into card pool
    	vm.getCardPool.then(function (response) {
    		console.log("SUCCESS SERVICE: " + vm.conference);
    		vm.cardPool = response;

	    	// First, create the slots map
	    	var cardMap = {}
	    	for (var i = 0; i < vm.cardPool.length; i++) {
	    		cardMap[vm.cardPool[i].id] = vm.cardPool[i];
	    	};

	    	var code = 'abcdefghijkl';

	    	var numberOfSlots = code.length; //25;
	    	var cardIndex = 0;
	    	var rowIndex = 0;
	    	while (cardIndex < numberOfSlots) {
	    		var cardRow = new rowTemplate();
	    		for (var i = 0; i < 5; i++) {
	    			cardRow.slots[i] = cardMap[code[cardIndex]];
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

    //--- HELPERS

	vm.getNumber = function(num) {
        return new Array(num);
    };

    // Emulates Splice on strings.
	function strSplice(str, index, count, add) {
		return str.slice(0, index) + (add || "") + str.slice(index + count);
	};

	function rowTemplate () {
		this.slots = [];
	}

	vm.init();
}]);