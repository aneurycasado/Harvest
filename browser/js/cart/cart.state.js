app.config(function ($stateProvider) {
    $stateProvider.state('cart', {
        url: '/:id/cart',
        templateUrl: 'js/cart/cart.html',
        resolve: {
            cart: function (CartFactory, $stateParams) {
              return CartFactory.getCart($stateParams.id);
            }
          },
        controller: 'CartCtrl'
    });
});
