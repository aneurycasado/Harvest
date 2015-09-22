app.config(function ($stateProvider) {
    $stateProvider.state('farmHome', {
        url: '/farmHome',
        templateUrl: 'js/farmHome/farmHome.html',
        resolve: {
          farms: (FarmFactory) => FarmFactory.getAll()
        },
        controller: 'FarmHomeCtrl'
    });
});
