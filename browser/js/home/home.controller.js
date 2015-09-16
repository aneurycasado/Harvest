app.controller('HomeCtrl', function ($scope, products, $state,  CartService) {
    $scope.products = products;
    $scope.goToProduct = function (product) {
        var productID = product._id;
        $state.go('product', {
            id: productID
        });
    };
    $scope.goToReview = function (product) {
        var productID = product._id;
        $state.go('review', {
            id: productID
        });
    };
    $scope.addToCart = function (product) {
      CartService.addToCart(product);
    };
});
