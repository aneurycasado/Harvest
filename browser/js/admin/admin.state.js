app.config(function ($stateProvider) {

    $stateProvider.state('admin', {
        url: '/admin',
        templateUrl: '/js/admin/admin.html',
        controller: 'adminCtrl',
        // The following data.authenticate is read by an event listener
        // that controls access to this state. Refer to app.js.
        // resolve: {
        //     reviews: function (ReviewService) {
        //         return ReviewService.getOn.id);
        //     },
        //     product: function (ProductService) {
        //         return ProductService.getOn.id);
        //     }
        // },
        data: {
            authenticate: true
        }
    });

});
