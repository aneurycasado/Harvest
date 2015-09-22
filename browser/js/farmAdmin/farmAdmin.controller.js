app.controller('farmAdminCtrl', function ($scope,$state, FarmFactory, farm) {
    $scope.farm = farm;
    $scope.updateInfo = false;
    $scope.showAddProduct = true;
    $scope.updatedFarmInfo = {};
    $scope.newProduct = {}
    $scope.addProductView = false;
    $scope.update = function(){
      $scope.updateInfo = true;
    }
    $scope.updateFarm = function(){
      FarmFactory.updateFarm($scope.farm._id,$scope.updatedFarmInfo).then(function(updatedFarm){
        $state.reload();
      });
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
    $scope.addFarmProduct = function(product){
      console.log("Product passed in ", product);
      console.log("We called")
      console.log("Product ", $scope.newProduct);
      FarmFactory.addFarmProduct($scope.farm._id,product).then(function(updatedFarm){
        $state.reload();
      });
    }
    // $scope.users = users;
    // $scope.products = products;
    // $scope.reviews = reviews;
    // $scope.orders = orders;
    // $scope.promos = promos;
    // $scope.active = null;
    // $scope.showProducts = function () {
    //     $scope.active = 'products';
    // };
    // $scope.showUsers = function () {
    //     $scope.active = 'users';
    // };
    // $scope.showReviews = function () {
    //     $scope.active = 'reviews';
    // };
    // $scope.showOrders = function () {
    //     $scope.active = 'orders';
    // };
    // $scope.showPromos = function () {
    //     $scope.active = 'promos';
    // };
});
