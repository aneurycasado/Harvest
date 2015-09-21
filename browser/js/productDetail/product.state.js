app.config(function ($stateProvider) {
    $stateProvider.state('productDetail', {
        url: '/productDetail/:id',
        templateUrl: 'js/productDetail/product.html',
        resolve: {
          reviews: (ReviewFactory,$stateParams) => ReviewFactory.getOne($stateParams.id),
          product: (ProductFactory,$stateParams) => ProductFactory.getOne($stateParams.id)
        },
        controller: 'ProductCtrl'
    });
});
