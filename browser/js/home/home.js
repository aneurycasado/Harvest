app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        resolve: {
            products: function (ProductService) {
                return ProductService.getAll();
            }
        },
        controller: 'HomeCtrl'
    });
});

app.controller('HomeCtrl', function ($scope, products, $state,  CartService) {
    $scope.products = products;

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
