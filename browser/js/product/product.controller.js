app.controller('ProductCtrl', function ($scope, $state, reviews, product, CartService) {
  $scope.product = product;
  $scope.reviews = reviews;
  $scope.addToCart = function(){
    console.log(product);
    CartService.addToCart($scope.product);
  };
});
