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
    
    function updateEmailForUser(user,email) {
      var userEmail = {
        email
      };
      return $http.put('/api/users/' + user, userEmail).then(response => response.data);
    }

    function resetPassword(user, newPassword) {
        var password = {password: newPassword};
        return $http.put('/api/users/password/' + user._id, password)
            .then(response => response.data);
    }

    return {
    	getAll,
    	updateUser,
        deleteUser,
        createUser,
        updateEmailForUser,
        resetPassword
    };
});
