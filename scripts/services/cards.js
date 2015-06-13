'use strict';

app.factory('cards', ['$http', '$routeParams', function ($http, $routeParams) {
	var requestUrl = 'json/' + $routeParams.conference + '.json';
	return $http.get(requestUrl)
		.success(function (data) {
			console.log("LOADED SERVICE: " + $routeParams.conference);
			return data;
		})
		.error(function (err) {
			console.log("ERROR SERVICES");
			return err;
		});
}]);