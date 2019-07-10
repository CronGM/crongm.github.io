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
  var winningStateValues = new Array(31, 992, 27648, 1015808, 1082401, 2164802, 32505856, 4325508, 8659208, 1114384, 17039425, 17318416);

  var cardStateValue = localStorageService.get(`${$scope.conference}.saved`) || 0;

  vm.cardPool = [];
  vm.updateCardTotalValue = updateCardTotalValue;
  vm.isCellMarked = isCellMarked;

  $scope.myCard = [];

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

  function updateCardTotalValue(index, checked) {

    // Add bit to value if cell is marked. Else, substract bit from total value.
    if (checked) {
      cardStateValue = cardStateValue | Math.pow(2, index);
    } else {
      cardStateValue = cardStateValue & (~Math.pow(2, index));
    }

    // Uncomment to save state on update
    localStorageService.set(`${$scope.conference}.saved`, cardStateValue);
    checkWinner();
  }

  function isCellMarked(index) {
    return (cardStateValue & Math.pow(2, index)) ? true : false;
  }

  function checkWinner() {
    var winningStateIndex = -1;
    // check the card's value against each of the winning values (with bit operation)
    for (var i = 0, n = winningStateValues.length; i < n; i++) {
      if ((cardStateValue & winningStateValues[i]) == winningStateValues[i]) {
        winningStateIndex = i;
        break;
      }
    }

    if (winningStateIndex > -1) {
      // TODO: Implement real winning screen
      console.info('A WINNER IS YOU');
    }
  }
}
