app.directive('category', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/category/category.html',
        link : function(scope, element, attr) {
          scope.currentCategory = undefined;
          scope.categories = ['veggies', 'fish', 'pizza'];
          scope.currentCategory = '';
          scope.changeCategory = function (category) {
            scope.currentCategory = category;
          };
        }
    };
});
