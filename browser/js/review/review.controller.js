app.controller('ReviewCtrl', function ($scope, $state, reviews, product) {
  $scope.product = product;
  $scope.reviews = reviews;
  $scope.goHome = function(){
    $state.go('home');
  };
  $scope.addToCurrentOrder = function(){
    //Will eventually add this to the current order in local storage
    console.log($scope.product);
  };
});
