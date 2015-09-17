app.controller('adminCtrl', function ($scope, reviews, products, users, ProductService, ReviewService, UserService) {
    $scope.users = users;
    $scope.products = products;
    $scope.reviews = reviews;
    $scope.active = null;
    console.log(reviews[15]);

    $scope.showProducts = function () {
        $scope.active = 'products';
    };
    $scope.showUsers = function () {
        $scope.active = 'users';
    };
    $scope.showReviews = function () {
        $scope.active = 'reviews';
    };
});
