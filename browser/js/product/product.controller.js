app.controller('ProductCtrl', function ($scope, $state, reviews, product, CartService, ReviewService, AuthService) {
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
    ReviewService.createReview($scope.product,$scope.newReview).then(function(review){
      return review;
    }).then(function(review){
      console.log("Created review ",review);
      $state.reload();
    }).then(null, function(error){
      console.error(error);
    });
  };

  $scope.addToCart = function(){
    console.log(product);
    CartService.addToCart($scope.product);
  };

  $scope.setThumb = function(isLiked){
    console.log(isLiked, typeof isLiked);
    $scope.review.thumb = isLiked;
  };

});
