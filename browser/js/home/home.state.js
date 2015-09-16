app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        resolve: {
            products: function (ProductService) {
                return ProductService.getAll();
            }
        },
        controller: 'HomeCtrl'
    });
});
