app.controller('TopNavController', ['$scope', '$location', function ($scope, $location) {
	vm = this;

	vm.isActive = function (viewLocation) {
		// Uncomment if you want to take parameters into account
		// return $location.path().indexOf(viewLocation) == 0;
		return viewLocation === $location.path();
	};
}])