app.controller('accountCtrl',function ($scope,$state, SecretStash, allOrders, currentUser, farm) {
	$scope.farm = farm;
	$scope.orders = allOrders;
	$scope.currentUser = currentUser;
  $scope.goToFarmAdmin = function(){
		$state.go("farmAdmin", {id:$scope.farm._id})
	}
});
