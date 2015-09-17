app.factory('UserFactory', function ($http) {
    function getAll() {
        return $http.get('/api/users').then(function (response) {
            return response.data;
        });
    }
    return {
    	getAll
    }
});
