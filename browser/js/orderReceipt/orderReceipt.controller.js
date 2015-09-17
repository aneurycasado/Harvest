app.controller('OrderReceiptController', function ($scope, order) {
  console.log(order);
  $scope.order = order;
});
