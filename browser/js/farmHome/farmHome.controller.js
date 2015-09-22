app.controller('FarmHomeCtrl', function ($scope, $state, farms) {
  $scope.farms = farms;
  console.log(farms);
  $scope.goToFarm = function(farm){
    $state.go("farm", {"name": farm.user.name, "id": farm._id});
  }
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
