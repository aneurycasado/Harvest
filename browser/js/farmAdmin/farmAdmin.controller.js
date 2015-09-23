app.controller('farmAdminCtrl', function ($scope,$state, FarmFactory, farm) {
    $scope.farm = farm;
    $scope.updateInfo = false;
    $scope.showAddProduct = true;
    $scope.updatedFarmInfo = {};
    $scope.newProduct = {};
    $scope.addProductView = false;
    $scope.update = function(){
        console.log('changing...');
      $scope.updateInfo = !$scope.updateInfo;
    };
    $scope.updateFarm = function(){
      FarmFactory.updateFarm($scope.farm._id,$scope.updatedFarmInfo).then(function(updatedFarm){
        $state.reload();
      });
    };
    $scope.goToProduct = function (product) {
        var productID = product._id;
        $state.go('productDetail', {
            id: productID
        });
    };
    $scope.addToCart = function (product) {
      CartFactory.addToCart(product);
    };
    $scope.addFarmProduct = function(product){
      FarmFactory.addFarmProduct($scope.farm._id,product).then(function(updatedFarm){
        $state.reload();
      });
    };
});
