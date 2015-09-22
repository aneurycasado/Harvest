app.controller('HomeCtrl', function ($scope, products, $state, CartFactory, ProductFactory) {
    $scope.products = products;
    $scope.minPrice = ProductFactory.minPrice(products);
    $scope.maxPrice = ProductFactory.maxPrice(products);

    $scope.priceSlider = {
        floor: ProductFactory.minPrice(products),
        ceil: ProductFactory.maxPrice(products),
        min: $scope.minPrice,
        max: $scope.maxPrice
    };
    $scope.reviewSlider = {
        floor: 0,
        ceil: 100,
        min: 0,
        max: 100
    };
    $scope.resetPrice = function(){
        $scope.priceSlider.min = $scope.minPrice;
        $scope.priceSlider.max = $scope.maxPrice;
    };
    $scope.resetReview = function(){
        $scope.reviewSlider.min = 0;
        $scope.reviewSlider.max = 100;
    };
    $scope.clearAll = function(){
        $scope.resetReview();
        $scope.resetPrice();
    };

    $scope.translate = function(val){
        return '$' + val;
    };
    $scope.translate2 = function(val){
        return val+"%";
    };

    $scope.goToProduct = function (product) {
        var productID = product._id;
        $state.go('product', {
            id: productID
        });
    };
    $scope.goToReview = function (product) {
        var productID = product._id;
        $state.go('review', {
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
app.filter('pricefilt', function(){
    return function(input, minPrice, maxPrice){
        var out = [];
        input.forEach(function(e){
            if(e.price>=minPrice && e.price<=maxPrice){
                out.push(e);
            }
        });
        return out;
    };
});
app.filter('reviewfilt', function(){
    return function(input, minPerc, maxPerc){
        var out = [];
        input.forEach(function(e){
            if(e.percentageLiked*100>=minPerc && e.percentageLiked*100<=maxPerc){
                out.push(e);
            }
        });
        return out;
    };
});