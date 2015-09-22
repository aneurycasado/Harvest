app.controller('createFarmCtrl',function($scope, $http){
  $scope.showAddProduct = true;
  $scope.farmInfo = {};
  $scope.createOrUpdateFarm = function () {
    $http.post('/api/farms/',{name: $scope.farmInfo.farmName, description: $scope.farmInfo.farmDescription})
  }
});
