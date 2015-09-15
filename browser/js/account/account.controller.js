app.controller('accountCtrl',function ($scope, SecretStash, allOrders) {
	$scope.orders = allOrders;	
	console.log($scope.orders);
    SecretStash.getStash().then(function (stash) {
        $scope.stash = stash;
    });
});