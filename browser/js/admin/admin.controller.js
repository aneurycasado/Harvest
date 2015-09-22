app.controller('adminCtrl', function ($scope, reviews, products, users, orders, promos) {
    $scope.users = users;
    $scope.products = products;
    $scope.reviews = reviews;
    $scope.orders = orders;
    $scope.promos = promos;
    $scope.active = null;

    $scope.showProducts = function () {
        $scope.active = 'products';
    };
    $scope.showUsers = function () {
        $scope.active = 'users';
    };
    $scope.showReviews = function () {
        $scope.active = 'reviews';
    };
    $scope.showOrders = function () {
        $scope.active = 'orders';
    };
    $scope.showPromos = function () {
        $scope.active = 'promos';
    };
});
