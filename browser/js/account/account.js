app.config(function ($stateProvider) {

    $stateProvider.state('account', {
        url: '/account',
        templateUrl: '/js/account/account.html',
        controller: 'accountCtrl',
        // The following data.authenticate is read by an event listener
        // that controls access to this state. Refer to app.js.
        resolve: {
            allOrders: function($http, $state, OrderService){
                return OrderService.getAll()
                .then(function(orders){
                    return orders;
                });
            }
        },
        data: {
            authenticate: true
        }
    });

});

app.factory('SecretStash', function ($http) {

    var getStash = function () {
        return $http.get('/api/members/secret-stash').then(function (response) {
            return response.data;
        });
    };

    return {
        getStash: getStash
    };

});