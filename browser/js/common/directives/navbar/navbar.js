app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, $state, CartService) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function (scope) {
            scope.cart = CartService;
            scope.items = [
                { label: 'Home', state: 'home' },
                { label: 'Account', state: 'account', auth: true }
            ];

            scope.user = null;

            scope.isLoggedIn = function () {
                return AuthService.isAuthenticated();
            };
            scope.find = function(){
              //Need to learn how to link the controller for the home page with the navbar controller
            };

            scope.logout = function () {
                AuthService.logout().then(function () {
                   $state.go('home');
                });
            };

            var setUser = function () {
                AuthService.getLoggedInUser().then(function (user) {
                    scope.user = user;
                    console.log("Set user ", user);
                    if(!user){
                      console.log("user is null");
                      CartService.getLocalCart();
                    }else{
                      CartService.getCart(user._id);
                    }
                });
            };

            var removeUser = function () {
                scope.user = null;
            };

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        },
        controller: 'NavbarCtrl'
    };
});

app.controller('NavbarCtrl', function ($scope, $state) {
  $scope.goToCart = function (user) {
    $state.go("cart", {
        id: user._id
    });
};

});
