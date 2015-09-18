app.directive('category', function (ProductFactory) {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/category/category.html',
        link: function (scope) {
            scope.currentCategory = undefined;
            scope.categories = ['Vegetables', 'Dairy', 'Fruits', 'All'];
            scope.currentCategory = '';
            scope.changeCategory = function (category) {
                scope.currentCategory = category;
                ProductFactory.getProductsByCategory(category).then(function (products) {
                    scope.products = products;
                });
            };
        }
    };
});
