'use strict';

app.controller('MainController', ['$scope', function ($scope) {
	var vm = this;

	vm.testvar = 'hola goey';

	vm.card = [
		{
			id: 'a',
			imageUrl: 'http://placevaughnandfranco.it/img/250/250',
			message: 'Texto de la casilla'
		}
	];

	vm.getNumber = function(num) {
        return new Array(num);   
    }
}]);