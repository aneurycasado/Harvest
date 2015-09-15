app.controller('accountCtrl',function ($scope, SecretStash, allOrders) {
	$scope.orders = allOrders;	
	console.log(allOrders);
    SecretStash.getStash().then(function (stash) {
        $scope.stash = stash;
    });
});