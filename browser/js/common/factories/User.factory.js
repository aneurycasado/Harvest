app.factory('UserFactory', function ($http) {
    function getAll() {
        return $http.get('/api/users').then(response => response.data);
    }
    return {
    	getAll
    }
});
