app.config(function ($stateProvider) {
    $stateProvider.state('farmAdmin', {
        url: 'farms/:id/farmAdmin',
        templateUrl: '/js/farmAdmin/farmAdmin.html',
        resolve: {
          farm: (FarmFactory, $stateParams) => {
            return FarmFactory.getOne($stateParams.id.toString());
          }
        },
        controller: 'farmAdminCtrl',
    })
});
