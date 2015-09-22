app.config(function ($stateProvider) {
    $stateProvider.state('farm', {
        url: ':name/farm/:id',
        templateUrl: 'js/farm/farm.html',
        resolve: {
          farm: (FarmFactory, $stateParams) => FarmFactory.getOne($stateParams.id)
        },
        controller: 'FarmCtrl'
    });
});
