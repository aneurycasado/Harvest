app.config(function ($stateProvider) {
    $stateProvider.state('review', {
        url: '/product/:id/reviews',
        templateUrl: 'js/review/review.html',
        resolve: {
          reviews: function(ReviewFactory,$stateParams){
            return ReviewFactory.getOne($stateParams.id);
          },
          product: function(ProductFactory,$stateParams){
            return ProductFactory.getOne($stateParams.id);
          }
        },
        controller: 'ReviewCtrl'
    });
});
