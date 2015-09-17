app.config(function ($stateProvider) {

    $stateProvider.state('admin', {
        url: '/admin',
        templateUrl: '/js/admin/admin.html',
        controller: 'adminCtrl',
        // The following data.authenticate is read by an event listener
        // that controls access to this state. Refer to app.js.
        resolve: {
            reviews: ReviewFactory => ReviewFactory.getAll(),
            products: ProductFactory => ProductFactory.getAll(),
            users: UserFactory => UserFactory.getAll(),
            orders: OrderFactory => OrderFactory.getAll(),
        }
    });

});
