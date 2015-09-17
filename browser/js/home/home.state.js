app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        resolve: {
            products: function (ProductFactory) {
                return ProductFactory.getAll();
            }
        },
        controller: 'HomeCtrl'
    });
});
