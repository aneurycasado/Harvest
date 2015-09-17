app.config(function ($stateProvider) {
    $stateProvider.state('review', {
        url: '/product/:id/reviews',
        templateUrl: 'js/review/review.html',
        resolve: {
          reviews: (ReviewFactory,$stateParams) => ReviewFactory.getOne($stateParams.id),
          product: (ProductFactory,$stateParams) => ProductFactory.getOne($stateParams.id)
        },
        controller: 'ReviewCtrl'
    });
});
