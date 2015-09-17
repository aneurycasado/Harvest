app.directive('category', function (ProductService) {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/category/category.html',
        link : function(scope, element, attr) {
          scope.currentCategory = undefined;
          scope.categories = ['Vegetables', 'Dairy', 'Fruits', 'All'];
          scope.currentCategory = '';
          scope.changeCategory = function (category) {
            scope.currentCategory = category;
            ProductService.getProductsByCategory(category).then(function(products){
              scope.products = products;
            });
          };
        }
    };
});
