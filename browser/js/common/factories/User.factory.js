app.factory('UserFactory', function ($http) {
    function getAll() {
        return $http.get('/api/users').then(response => response.data);
    }

    function updateUser(user) {
    	return $http.put('/api/users', user).then(response => response.data);
    }

    return {
    	getAll,
    	updateUser
    };
});
