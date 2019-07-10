'use strict';

angular
	.module('BingoApp')
	.controller('BingoController', BingoController);

BingoController.$inject = ['$scope', '$routeParams', 'localStorageService', '$location'];
function BingoController ($scope, $routeParams, localStorageService, $location) {
	var vm = this;
	var validConferences = ['nintendo', 'playstation', 'xbox', 'got'];
	var conference = $routeParams.conference || '';
	var cardCode = localStorageService.get(conference) || '';

	vm.conference = conference;
	vm.isCodeValid = false;
	vm.urlHost = $location.host();

	init();

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

		localStorageService.set(vm.conference, cardCode);

		return cardCode
	};

	function validateCardCode(code) {
		var codePattern = /^(?:([A-Za-z])(?!.*\1))*$/;

		// Check that cardCode has exactly 24 characters. 25th character (free cell) is inserted later.
		if (code.length != 24) {
			// TODO: Show cardCode error message
			console.error("Invalid card code");
			return false;
		}

		// Check that no cell is repeated
		if (!codePattern.test(code)) {
			// TODO: Show cardCode error message
			console.error("Invalid card pattern");
			return false;
		};

		return true;
	};

	function init() {
		// Check that conference parameter is valid
		if (validConferences.indexOf(vm.conference) == -1) {
			// TODO: Show conference error message
			console.error("Invalid conference URL");
			return;
		}
		if ($routeParams.shared) {
			vm.isSharedCode = $routeParams.shared;
			cardCode = $routeParams.cardCode;
		}

		// Handle missing route parameters
		if (!cardCode) {
			cardCode = generateCardCode();
		}

		vm.isCodeValid = validateCardCode(cardCode);

		if (vm.isCodeValid) {
			vm.shareCode = cardCode;
			// Insert free cell only after share code is set.
			// TODO: Make free cell general for all cards and out of JSON
			vm.cardLogoUrl = 'images/logo_' + vm.conference + '.png';
			vm.cardCode = strSplice(cardCode, 12, 0, 'x');
		};
	};

	//--- HELPERS

	// Emulates Splice on strings.
	function strSplice(str, index, count, add) {
		return str.slice(0, index) + (add || "") + str.slice(index + count);
	};
}
