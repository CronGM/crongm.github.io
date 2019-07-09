angular
	.module('BingoApp')
	.controller('TopNavController', TopNavController)

TopNavController.$inject = ['$scope', '$location', ];
function TopNavController ($scope, $location) {
	vm = this;

	vm.isActive = function (viewLocation) {
		// Uncomment if you want to take parameters into account
		// return $location.path().indexOf(viewLocation) == 0;
		return viewLocation === $location.path();
	};
}
