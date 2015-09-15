app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, $state, CartService) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function (scope) {
            scope.cart = CartService;
            console.log("cart ", scope.cart);
            scope.items = [
                { label: 'Home', state: 'home' },
                { label: 'About', state: 'about' },
                { label: 'Documentation', state: 'docs' },
                { label: 'Account', state: 'account', auth: true }
            ];

            scope.user = null;

            scope.isLoggedIn = function () {
                return AuthService.isAuthenticated();
            };
            scope.find = function(){
              //Need to learn how to link the controller for the home page with the navbar controller
              console.log("filter all the products by this name");
            };

            scope.logout = function () {
                AuthService.logout().then(function () {
                   $state.go('home');
                });
            };

            var setUser = function () {
                AuthService.getLoggedInUser().then(function (user) {
                    scope.user = user;
                });
            };

            var removeUser = function () {
                scope.user = null;
            };

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        }
    };

});
