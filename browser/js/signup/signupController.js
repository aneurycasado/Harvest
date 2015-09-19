app.controller('SignupController', function ($scope, $state, UserFactory, AuthService) {
	console.log('something is happening');
	$scope.createUser = function (user) {
		UserFactory.createUser(user)
			.then(function (createdUser) {
				return AuthService.login({email: user.email, password: user.password});
			})
			.then(function (loggedInUser) {
				$state.go('home');
			});
	};
});