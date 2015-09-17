app.controller('OrderAccordionCtrl', function ($scope, OrderFactory) {
  $scope.oneAtATime = true;

  $scope.addItem = function() {
    var newItemNo = $scope.items.length + 1;
    $scope.items.push('Item ' + newItemNo);
  };

  $scope.updateOrder = function (order) {
    console.log('got to the controller', order);
    OrderFactory.updateOrder(order);
  };

  $scope.status = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
});
