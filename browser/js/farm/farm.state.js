app.config(function ($stateProvider) {
    $stateProvider.state('farm', {
        url: ':id/farm',
        templateUrl: 'js/farm/farm.html',
        // resolve: {
        //     cart: (CartFactory, $stateParams) => CartFactory.getCart($stateParams.id)
        //   },
        controller: 'FarmCtrl'
    });
});
