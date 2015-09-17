app.controller('ProductCtrl', function ($scope, $state, reviews, product, CartFactory, ReviewFactory, AuthService) {
  $scope.product = product;
  $scope.reviews = reviews;
  $scope.loggedIn = true;
  $scope.showCreateReviewForm = false;
  $scope.isAuthenticated = AuthService.isAuthenticated();
  $scope.revealForm = function () {
    $scope.showCreateReviewForm = !$scope.showCreateReviewForm;
  };

  $scope.createReview = function() {
    $scope.newReview.product = $scope.product;
    ReviewFactory.createReview($scope.product,$scope.newReview).then(function(review){
      return review;
    }).then(function(){
      $state.reload();
    }).then(null, function(error){
      console.error(error);
    });
  };

  $scope.addToCart = function(){
    CartFactory.addToCart($scope.product);
  };

  $scope.setThumb = function(isLiked){
    $scope.review.thumb = isLiked;
  };

});
