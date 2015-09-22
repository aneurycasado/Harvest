app.controller('FarmHomeCtrl', function ($scope, $state, farms) {
  $scope.farms = farms;
  console.log(farms);
  $scope.goToFarm = function(farm){
    $state.go("farm", {"name": farm.user.name, "id": farm._id});
  }
});
