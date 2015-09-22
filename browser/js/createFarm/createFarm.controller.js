app.controller('createFarmCtrl',function($scope,$state, $http){
  $scope.showAddProduct = true;
  $scope.farmInfo = {};
  $scope.createOrUpdateFarm = function () {
    $http.post('/api/farms/',{name: $scope.farmInfo.farmName, description: $scope.farmInfo.farmDescription}).then(function(id){
      $state.go("farmAdmin",{id:id});
    });
  }
});
