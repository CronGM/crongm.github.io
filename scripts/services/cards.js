'use strict';

app.factory('cards', ['$http', '$routeParams', function ($http, $routeParams) {
	var requestUrl = 'json/' + $routeParams.conference + '.json';
	return $http.get(requestUrl)
		.success(function (data) {
			return data;
		})
		.error(function (err) {
			return err;
		});
}]);