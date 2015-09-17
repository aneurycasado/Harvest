app.config(function ($stateProvider) {
    $stateProvider.state('product', {
        url: '/product/:id',
        templateUrl: 'js/product/product.html',
        resolve: {
          reviews: (ReviewFactory,$stateParams) => ReviewFactory.getOne($stateParams.id),
          product: (ProductFactory,$stateParams) => ProductFactory.getOne($stateParams.id)
        },
        controller: 'ProductCtrl'
    });
});
