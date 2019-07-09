'use strict';

angular
	.module('BingoApp')
	.factory('cardsService', ['$q', '$http', '$routeParams', function ($q, $http) {
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
	}]);
