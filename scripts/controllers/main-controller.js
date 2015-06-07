'use strict';

app.controller('MainController', ['$scope', function ($scope) {
	var vm = this;

	vm.testvar = 'hola goey';
	vm.getNumber = function(num) {
        return new Array(num);   
    }
}]);