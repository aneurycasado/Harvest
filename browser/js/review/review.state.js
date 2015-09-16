app.config(function ($stateProvider) {
    $stateProvider.state('review', {
        url: '/product/:id/reviews',
        templateUrl: 'js/review/review.html',
        resolve: {
          reviews: function(ReviewService,$stateParams){
            return ReviewService.getOne($stateParams.id);
          },
          product: function(ProductService,$stateParams){
            return ProductService.getOne($stateParams.id);
          }
        },
        controller: 'ReviewCtrl'
    });
});
