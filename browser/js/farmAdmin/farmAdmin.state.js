app.config(function ($stateProvider) {

    $stateProvider.state('farmAdmin', {
        url: '/farmAdmin',
        templateUrl: '/js/farmAdmin/farmAdmin.html',
        controller: 'farmAdminCtrl',
        // The following data.authenticate is read by an event listener
        // that controls access to this state. Refer to app.js.
        resolve: {
            reviews: ReviewFactory => ReviewFactory.getAll(),
            products: (FarmFactory) => FarmFactory.getOne(),
            users: UserFactory => UserFactory.getAll(),
            orders: OrderFactory => OrderFactory.getAll(),
            promos: PromoFactory => PromoFactory.getAll()
        }
    })
    .state('createFarm', {
        url: '/createFarm',
        templateUrl: '/js/farmAdmin/createFarm.html',
        controller: 'createFarmCtrl',
    })

});
