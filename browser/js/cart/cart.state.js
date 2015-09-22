app.config(function ($stateProvider) {
    $stateProvider.state('cart', {
        url: '/:id/cart',
        templateUrl: 'js/cart/cart.html',
        resolve: {
            cart: (CartFactory, $stateParams) => CartFactory.getCart($stateParams.id),
          	promos: (PromoFactory) => PromoFactory.getAll()
          },
        controller: 'CartCtrl'
    });
});
