app.config(function ($stateProvider) {
    $stateProvider.state('review', {
        url: '/:id/reviews',
        templateUrl: 'js/review/review.html',
        resolve: {
          reviews: function(ReviewService,$stateParams){
            console.log("StateParams");
            console.log($stateParams);
            return ReviewService.getOne($stateParams.id);
          },
          product: function(ProductService,$stateParams){
            return ProductService.getOne($stateParams.id);
          }
        },
        controller: 'ReviewCtrl'
    });
});

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
