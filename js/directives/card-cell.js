angular
  .module('BingoApp')
  .directive('cardCell', cardCellDirective);

function cardCellDirective() {
  return {
    require: '^bingoCard',
    restrict: 'E',
    scope: true,
    controller: cardCellController,
    link: cardCellLink
  }
}

cardCellController.$inject = ['$scope'];
function cardCellController ($scope) {
  $scope.toggleChecked = function () {
    if ($scope.$index === 12) return;

    $scope.isMarked = !$scope.isMarked;
    $scope.cardCtrl.updateCardTotalValue($scope.$index, $scope.isMarked);
  };
}

function cardCellLink (scope, elem, attr, cardCtrl) {
  scope.cardCtrl = cardCtrl;
  scope.isMarked = cardCtrl.isCellMarked(scope.$index);
}
