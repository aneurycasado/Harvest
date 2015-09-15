app.controller('accountCtrl',function ($scope, SecretStash, allOrders, OrderService) {

	$scope.orders = allOrders;
	OrderService.formatDates($scope.orders);
    SecretStash.getStash().then(function (stash) {
        $scope.stash = stash;
    });
});
