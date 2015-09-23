app.controller('FarmCtrl', function ($scope, $state, farm, CartFactory, ProductFactory) {
    $scope.farm = farm;
    $scope.products = farm.products;
    $scope.minPrice = Math.floor(ProductFactory.minPrice($scope.products));
    $scope.maxPrice = Math.ceil(ProductFactory.maxPrice($scope.products));
    $scope.activeCat = null;
    $scope.cats = [null, 'Dairy', 'Vegetables', 'Fruits'];
    $scope.styles = farm.styles;
    for(var key in $scope.styles){
      var style = $scope.styles[key];
      if(key === "filter"){
        var filter = document.getElementsByClassName('nav-sidebar')[0];
        filter.style.backgroundColor = style;
      }else if (key === "navBar"){
        var navBar = document.getElementsByClassName('navbar')[0];
        navBar.style.backgroundColor = style;
      }else if(key === "pageText"){
        var wrap = document.getElementById('wrap');
        wrap.style.fontFamily = style;
      }else if(key === "backgroundColor"){
        var wrap = document.getElementById('wrap');
        wrap.style.backgroundColor = style;
      }else if(key === "footer"){
        var footer = document.getElementById('footer');
        footer.style.backgroundColor = style;
      }
    }
    if($scope.styles === "red"){
      var filters = document.getElementsByClassName('nav-sidebar');
      filters[0].style.backgroundColor = 'blue';
    }
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
