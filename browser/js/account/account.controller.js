app.controller('accountCtrl',function ($scope, SecretStash, allOrders, currentUser) {
	$scope.orders = allOrders;
	$scope.currentUser = currentUser;
    SecretStash.getStash().then(function (stash) {
        $scope.stash = stash;
    });
});
