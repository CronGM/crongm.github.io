angular
  .module('BingoApp')
  .directive('cardCell', cardCellDirective);

function cardCellDirective() {
  return {
    require: '^bingoCard',
    restrict: 'E',
    scope: {
      index: '@cellIndex'
    },
    link: function (scope, elem, attr, cardCtrl) {
      elem.click(function () {
        elem.toggleClass('checked');
        scope.isMarked = scope.isMarked == true ? false : true;
        cardCtrl.updateCellState(scope.index, scope.isMarked);
      })
    }
  }
}
