app.controller('ProductCtrl', function ($scope, $state, reviews, product, CartService, ReviewService) {
  $scope.product = product;
  $scope.reviews = reviews;
  $scope.loggedIn = true;
  $scope.showCreateReviewForm = false;
  $scope.thumb = null;
  $scope.revealForm = function () {
    $scope.showCreateReviewForm = !$scope.showCreateReviewForm;
  };

  $scope.createReview = function() {
    console.log($scope.newReview);
    $scope.newReview.product = $scope.product;
    ReviewService.createReview($scope.newReview).then(function(review){
      return review;
    }).then(function(review){
      return ReviewService.getOne($stateParams.id);
    }).then(function(updatedReviews){
      $scope.reviews = updatedReviews;
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
