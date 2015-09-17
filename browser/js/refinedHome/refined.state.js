app.config(function ($stateProvider) {
    $stateProvider.state('refinedHome', {
        url: '/:searchInput',
        templateUrl: 'js/refinedHome/refinedHome.html',
        resolve: {
            products: function ($stateParams,ProductFactory) {
                return ProductFactory.refineProducts($stateParams.searchInput);
            }
        },
        controller: 'RefinedHomeCtrl'
    });
});
