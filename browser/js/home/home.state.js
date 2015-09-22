app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        resolve: {
            products: ProductFactory => ProductFactory.getAll()
        },
        controller: 'HomeCtrl'
    });
});