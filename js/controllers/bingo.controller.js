'use strict';

angular
	.module('BingoApp')
	.controller('BingoController', BingoController);

BingoController.$inject = ['$scope', '$routeParams', 'cardsService', 'localStorageService', '$location'];
function BingoController ($scope, $routeParams, cardsService, localStorageService, $location) {
	var vm = this;
	var validConferences = ['nintendo', 'playstation', 'xbox', 'got'];
	var getCardPool = cardsService.getPool($routeParams);

	vm.conference = $routeParams.conference || '';
	vm.cardCode = localStorageService.get(vm.conference) || '';
	vm.isCodeValid = false;
	vm.urlHost = $location.host();


	vm.cardPool = [];

	vm.updateCellState = function(index, value) {
		// vm.cardState += index to bit power (could be negative to substract);
		console.log('guardando:', index, value);
		console.log('tarjeta', vm.cardState);
	}

	function generateCardCode () {
		// Add more characters according to your JSON pool
		// var chars="abcdefghijklmnopqrstuvwyzABCDEFGHIJKLMNOP";
		var chars = "abcdefghijklmnopqrstuvwyz";
		var indexOut = 0;
		var cardCode = '';

		for (var i = 0; i < 24; i++) {
			indexOut = Math.floor(Math.random() * chars.length);
			cardCode += chars[indexOut];
			chars = strSplice(chars, indexOut, 1);
		};

		// Save to local storage
		localStorageService.set(vm.conference, cardCode);

		return cardCode
	};

	function validateCardCode() {
		var codePattern = /^(?:([A-Za-z])(?!.*\1))*$/;

		// Check that cardCode has exactly 24 characters. 25th character (free cell) is inserted later.
		if (vm.cardCode.length != 24) {
			// TODO: Show cardCode error message
			console.error("Invalid card code");
			return false;
		}

		// Check that no cell is repeated
		if (!codePattern.test(vm.cardCode)) {
			// TODO: Show cardCode error message
			console.error("Invalid card pattern");
			return false;
		};

		return true;
	};

	function drawCard () {
		// Load the cards from JSON into card pool
		getCardPool.then(function (data) {
			vm.cardPool = data;

			// First, create the slots map
			var cardMap = {}
			for (var i = 0; i < vm.cardPool.length; i++) {
				cardMap[vm.cardPool[i].id] = vm.cardPool[i];
			};

			var cardIndex = 0;

			for (var i = 0; i < vm.cardCode.length; i++) {
				vm.myCard.push(cardMap[vm.cardCode[cardIndex]]);
				cardIndex += 1;
			}
		});
	};

	// TODO: This could be moved to a directive
	function init() {
		vm.cardPool = [];
		vm.myCard = [];

		// Check that conference parameter is valid
		if (validConferences.indexOf(vm.conference) == -1) {
			// TODO: Show conference error message
			console.error("Invalid conference URL");
			return;
		}
		if ($routeParams.shared) {
			vm.isSharedCode = $routeParams.shared;
			vm.cardCode = $routeParams.cardCode;
		}

		// Handle missing route parameters
		if (!vm.cardCode) {
			vm.cardCode = generateCardCode();
		}

		vm.isCodeValid = validateCardCode();

		if (vm.isCodeValid) {
			vm.shareCode = vm.cardCode;
			// Insert free cell only after share code is set.
			// TODO: Make free cell general for all cards and out of JSON
			vm.cardCode = strSplice(vm.cardCode, 12, 0, 'x');
			vm.cardLogoUrl = 'images/logo_' + vm.conference + '.png';
			drawCard();
		};
	};

	//--- HELPERS

	// Emulates Splice on strings.
	function strSplice(str, index, count, add) {
		return str.slice(0, index) + (add || "") + str.slice(index + count);
	};

	init();
}
