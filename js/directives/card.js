angular
	.module('BingoApp')
  .directive('bingoCard', bingoCardDirective)

function bingoCardDirective () {
  return {
    restrict: 'E',
    controller: function() {
      vm = this;
      vm.cardState = localStorageService.get('card') || 0;
    },
    link: function (scope, elem, attr) {
      console.info('I exist');
    }
  }
}
