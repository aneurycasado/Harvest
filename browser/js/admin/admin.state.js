app.config(function ($stateProvider) {

    $stateProvider.state('admin', {
        url: '/admin',
        templateUrl: '/js/admin/admin.html',
        controller: 'adminCtrl',
        // The following data.authenticate is read by an event listener
        // that controls access to this state. Refer to app.js.
        resolve: {
            reviews: function (ReviewFactory) {
                return ReviewFactory.getAll();
            },
            products: function (ProductFactory) {
                return ProductFactory.getAll();
            },
            users: function (UserFactory) {
                return UserFactory.getAll();
            },
            orders: function (OrderFactory) {
                return OrderFactory.getAll();
            }
        }
    });

});
