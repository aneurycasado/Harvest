app.config(function ($stateProvider) {
    $stateProvider.state('product', {
        url: '/product/:id',
        templateUrl: 'js/product/product.html',
        resolve: {
          reviews: function(ReviewFactory,$stateParams){
            return ReviewFactory.getOne($stateParams.id);
          },
          product: function(ProductFactory,$stateParams){
            return ProductFactory.getOne($stateParams.id);
          }
        },
        controller: 'ProductCtrl'
    });
});
