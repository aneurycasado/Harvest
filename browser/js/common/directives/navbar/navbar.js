app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, $state, CartService, ProductService) {

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
                   window.location.replace("/");
                });
            };

            var setUser = function () {
                AuthService.getLoggedInUser().then(function (user) {
                    scope.user = user;
                    if(!user){
                      console.log("Guess user");
                      CartService.getLocalCart();
                    }else{
                      console.log("Not guess user")
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

app.controller('NavbarCtrl', function ($scope, $state, ProductService) {
  $scope.products = null;
  ProductService.getAll().then(function(products){
    $scope.products = products;
  });
  $scope.goToCart = function (user) {
    if(user === null){
      $state.go('cart');
    }else{
      $state.go("cart", {
          id: user._id
      });
    }
  };
  $scope.search = function(){
    console.log("We are in search");
    console.log("Search string ", $scope.searchInput);
    $state.go("refinedHome", {searchInput: $scope.searchInput});
  }
});
