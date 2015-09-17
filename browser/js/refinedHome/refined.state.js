app.config(function ($stateProvider) {
    $stateProvider.state('refinedHome', {
        url: '/:searchInput',
        templateUrl: 'js/refinedHome/refinedHome.html',
        resolve: {
            products: ($stateParams,ProductFactory) => ProductFactory.refineProducts($stateParams.searchInput)
        },
        controller: 'RefinedHomeCtrl'
    });
});
