app.config(function ($stateProvider) {
    $stateProvider.state('personalize', {
        url: '/personalize',
        templateUrl: 'js/personalize/personalize.html',
        resolve: {
            userOrders: OrderFactory => OrderFactory.getAllForUser(),
            products: ProductFactory => ProductFactory.getAll(),
            allOrders: OrderFactory => OrderFactory.getAll()
        },
        controller: 'PersonalizeController'
    });
});
