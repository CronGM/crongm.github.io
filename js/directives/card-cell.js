app.directive('cardCell', function () {
    return {
        restrict: 'E',
        link: function (scope, element, attr) {
            element.click(function () {
                element.toggleClass('checked');
            })
        }
    }
})