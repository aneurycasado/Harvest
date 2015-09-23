app.controller('FarmCtrl', function ($scope, $state, farm, CartFactory, ProductFactory) {
    console.log(farm);
    $scope.farm = farm;
    $scope.products = farm.products;
    $scope.minPrice = Math.floor(ProductFactory.minPrice($scope.products));
    $scope.maxPrice = Math.ceil(ProductFactory.maxPrice($scope.products));
    $scope.activeCat = null;
    $scope.cats = [null, 'Dairy', 'Vegetables', 'Fruits'];

    $scope.priceSlider = {
        floor: Math.floor(ProductFactory.minPrice($scope.products)),
        ceil: Math.ceil(ProductFactory.maxPrice($scope.products)),
        min: $scope.minPrice,
        max: $scope.maxPrice
    };

    $scope.reviewSlider = {
        floor: 0,
        ceil: 100,
        min: 0,
        max: 100
    };

    $scope.setCat = function (cat) {
        $scope.activeCat = cat;
    };

    $scope.resetPrice = function () {
        $scope.priceSlider.min = $scope.minPrice;
        $scope.priceSlider.max = $scope.maxPrice;
    };
    $scope.resetReview = function () {
        $scope.reviewSlider.min = 0;
        $scope.reviewSlider.max = 100;
    };
    $scope.clearAll = function () {
        $scope.resetReview();
        $scope.resetPrice();
        $scope.searchInput = '';
        $scope.activeCat = null;
    };
    $scope.translate = function (val) {
        return '$' + val;
    };
    $scope.translate2 = function (val) {
        return val + "%";
    };

    $scope.goToProduct = function (product) {
        var productID = product._id;
        $state.go('productDetail', {
            id: productID
        });
    };
    $scope.addToCart = function (product) {
        CartFactory.addToCart(product);
    };
    $scope.clearFilters = function () {
        $scope.searchInput = "";
    };
});
