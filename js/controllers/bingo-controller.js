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
	vm.cardState = localStorageService.get('card') || 0;

	vm.cardPool = [];

	vm.generateCardCode = function () {
		// var chars="abcdefghijklmnopqrstuvwyzABCDEFGHIJKLMNOP";
		var chars = "abcdefghijklmnopqrstuvwyz";
		var indexOut = 0;
		vm.cardCode = '';

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
	};

	vm.updateCellState = function(index, value) {
		// vm.cardState += index to bit power (could be negative to substract);
		console.log('guardando:', index, value);
		console.log('tarjeta', vm.cardState);
	}

	var readCardCode = function () {
		var codePattern = /^(?:([A-Za-z])(?!.*\1))*$/;

		// Check that cardCode has exactly 24 characters. 25th character (free cell) is inserted later.
		if (vm.cardCode.length != 24) {
			// TODO: Show cardCode error message
			console.error("Invalid card code");
			return;
		}

		// Check that no cell is repeated
		if (!codePattern.test(vm.cardCode)) {
			// TODO: Show cardCode error message
			console.error("Invalid card pattern");
			return;
		};

		vm.shareCode = vm.cardCode;
		// If cardCode is valid insert free cell
		// TODO: Make free cell general for all cards and out of JSON
		vm.cardCode = strSplice(vm.cardCode, 12, 0, 'x');
		vm.isCodeValid = true;
	};

	var drawCard = function () {
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
	var init = function () {
		console.log("INIT BINGO CONTROLLER");
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
	};

	//--- HELPERS

	// vm.getNumber = function(num) {
	//     return new Array(num);
	// };

	// Emulates Splice on strings.
	function strSplice(str, index, count, add) {
		return str.slice(0, index) + (add || "") + str.slice(index + count);
	};

	init();
}
