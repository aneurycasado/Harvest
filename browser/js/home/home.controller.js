app.controller('HomeCtrl', function ($scope, products, $state, CartFactory) {
    $scope.products = products;
    $scope.goToProduct = function (product) {
        var productID = product._id;
        $state.go('productDetail', {
            id: productID
        });
    };
    $scope.addToCart = function (product) {
      CartFactory.addToCart(product);
    };
});
