app.factory('UserFactory', function ($http) {
    function getAll() {
        return $http.get('/api/users').then(response => response.data);
    }

    function updateUser(user) {
    	return $http.put('/api/users', user).then(response => response.data);
    }

    function deleteUser (user) {
        return $http({
            method: 'DELETE',
            url: '/api/users',
            data: user,
            headers: {"Content-Type": "application/json;charset=utf-8"}
        })
        .then(response => response.data);
    }

    function createUser (user) {
        return $http.post('/api/users', user).then(response => response.data);
    }

    return {
    	getAll,
    	updateUser,
        deleteUser,
        createUser
    };
});
