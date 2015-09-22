app.controller('FarmCtrl', function ($scope,$state,farm, CartFactory) {
  console.log(farm);
  $scope.farm = farm;

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
