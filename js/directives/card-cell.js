angular
  .module('BingoApp')
  .directive('cardCell', cardCellDirective);

function cardCellDirective() {
  return {
    restrict: 'E',
    scope: {
      updateCell: '&updateCellState',
      index: '@cellIndex'
    },
    link: function (scope, elem, attr) {
      elem.click(function () {
        elem.toggleClass('checked');
        scope.isMarked = scope.isMarked == true ? false : true;
        scope.updateCell()(scope.index, scope.isMarked);
      })
    }
  }
}
