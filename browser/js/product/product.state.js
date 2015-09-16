app.config(function ($stateProvider) {
    $stateProvider.state('product', {
        url: '/product/:id',
        templateUrl: 'js/product/product.html',
        resolve: {
          reviews: function(ReviewService,$stateParams){
            return ReviewService.getOne($stateParams.id);
          },
          product: function(ProductService,$stateParams){
            return ProductService.getOne($stateParams.id);
          }
        },
        controller: 'ProductCtrl'
    });
});
