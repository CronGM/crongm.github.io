angular
	.module('BingoApp')
  .directive('bingoCard', bingoCardDirective)

function bingoCardDirective () {
  return {
    restrict: 'E',
    scope: {
      cardCode: '@',
      conference: '@'
    },
    templateUrl: '/js/directives/card.template.html',
    controller: cardController
  }
}

cardController.$inject = ['$scope', '$routeParams', 'cardsService', 'localStorageService']
function cardController ($scope, $routeParams, cardsService, localStorageService) {
  var vm = this;
  var getCardPool = cardsService.getPool($routeParams);
  var cardState = localStorageService.get('card') || 0;

  vm.cardPool = [];

  $scope.myCard = [];

  vm.updateCellState = function(index, value) {
    // cardState += index to bit power (could be negative to substract);
    console.log('guardando:', index, value);
    console.log('tarjeta', cardState);
  }

  drawCard();

  function drawCard () {
    // Load the cards from JSON into card pool
    getCardPool.then(function (data) {
      vm.cardPool = data;

      // First, create the slots map
      var cardMap = {}
      for (var i = 0; i < vm.cardPool.length; i++) {
        cardMap[vm.cardPool[i].id] = vm.cardPool[i];
      };

      var cardIndex = 0;
      for (var i = 0; i < $scope.cardCode.length; i++) {
        $scope.myCard.push(cardMap[$scope.cardCode[cardIndex]]);
        cardIndex += 1;
      }
    });
  };
}
