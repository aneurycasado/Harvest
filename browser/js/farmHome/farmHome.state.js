app.config(function ($stateProvider) {
    $stateProvider.state('farmHome', {
        url: '/farmHome',
        templateUrl: 'js/farmHome/farmHome.html',
        // resolve: {
        //     cart: (CartFactory, $stateParams) => CartFactory.getCart($stateParams.id)
        //   },
        controller: 'FarmHomeCtrl'
    });
});
