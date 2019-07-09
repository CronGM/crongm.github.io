angular
	.module('BingoApp')
  .directive('bingoCard', bingoCardDirective)

function bingoCardDirective () {
  return {
    restrict: 'E',
    link: function (scope, elem, attr) {
    }
  }
}
