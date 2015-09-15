app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        resolve: {
          products: function(ProductService){
            return ProductService.getAll()
          }
        },
        controller: 'HomeCtrl'
    });
});

app.controller('HomeCtrl', function ($scope, products, $state) {
  console.log($scope);
  $scope.products = products;
  $scope.currentOrder = [];
  $scope.goToReview = function(product){
    console.log("Product");
    console.log(product);
    var productID = product._id
    console.log(productID);
    $state.go('review',{id: productID});
  };
  $scope.addToCart = function(product){
    $scope.currentOrder.push(product);
    console.log($scope.currentOrder);
  };
});
