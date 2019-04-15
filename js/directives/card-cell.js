app.directive('cardCell', function () {
    return {
        restrict: 'E',
        scope: {},
        link: function (scope, element, attr) {
            element.click(function () {
                element.toggleClass('checked');
                scope.isMarked = scope.isMarked == true ? false : true;
            })
        }
    }
})
