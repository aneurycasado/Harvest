app.config(function ($stateProvider) {
    $stateProvider.state('cart', {
        url: '/:id/cart',
        templateUrl: 'js/cart/cart.html',
        resolve: {
          cart: function(CartService,$stateParams){
            console.log("cart ", $stateParams.id)
            return CartService.getCart($stateParams.id);
          }
        },
        controller: 'CartCtrl'
    });
});
