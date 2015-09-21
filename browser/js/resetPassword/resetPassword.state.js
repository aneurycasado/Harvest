app.config(function ($stateProvider) {
    $stateProvider.state('resetPassword', {
        url: '/resetPassword',
        templateUrl: 'js/resetPassword/resetPassword.html',
        controller: 'SignupController'
    });
});
