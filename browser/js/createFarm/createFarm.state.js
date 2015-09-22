app.config(function ($stateProvider) {
  $stateProvider
  .state('createFarm', {
    url: '/createFarm',
    templateUrl: '/js/createFarm/createFarm.html',
    controller: 'createFarmCtrl'
  })
});

app.controller('createFarmCtrl',function($scope, $state,FarmFactory ){
  $scope.farmInfo = {};
  $scope.createOrUpdateFarm = function () {
    FarmFactory.createOne($scope.farmInfo).then(function(createdFarm){
      $state.go("farmAdmin",{id:createdFarm._id});
    });
  }
});
