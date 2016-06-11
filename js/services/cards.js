'use strict';

app.factory('cards', ['$q', '$http', '$routeParams', function ($q, $http, $routeParams) {
	var exports = {};

	exports.getPool = function (params) {
		if (params.conference) {
			var queryUrl = 'json/' + params.conference + '.json';
			var deferred = $q.defer();
			$http.get(queryUrl)
				.success(function (data) {
					deferred.resolve(data);
				})
				.error(function (data) {
					deferred.reject(data);
				});
			return deferred.promise;
		}
	};

	return exports;

	// var requestUrl = 'json/' + $routeParams.conference + '.json';
	// return $http.get(requestUrl)
	// 	.success(function (data) {
	// 		console.log("LOADED SERVICE: " + $routeParams.conference);
	// 		return data;
	// 	})
	// 	.error(function (err) {
	// 		console.log("ERROR SERVICES");
	// 		return err;
	// 	});
}]);