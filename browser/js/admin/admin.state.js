app.config(function ($stateProvider) {

    $stateProvider.state('admin', {
        url: '/admin',
        templateUrl: '/js/admin/admin.html',
        controller: 'adminCtrl',
        // The following data.authenticate is read by an event listener
        // that controls access to this state. Refer to app.js.
        resolve: {
            reviews: function (ReviewService) {
                return ReviewService.getAll();
            },
            products: function (ProductService) {
                return ProductService.getAll();
            },
            users: function (UserService) {
                return UserService.getAll();
            },
            orders: function (OrderService) {
                return OrderService.getAll();
            }
        }
    });

});
