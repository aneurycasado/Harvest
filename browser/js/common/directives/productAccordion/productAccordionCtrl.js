app.controller('ProductAccordionCtrl', function ($scope, $state, ProductFactory) {
    $scope.oneAtATime = true;
    $scope.showAddProduct = false;

    $scope.updateProduct = function (product) {
        ProductFactory.updateProduct(product)
            .then(function (product) {
                $scope.products.unshift(product);
            });
    };

    $scope.showAddProductForm = function () {
        $scope.showAddProduct = true;
    };

    $scope.createProduct = function (product) {
        ProductFactory.addProduct(product);
    };

    $scope.deleteProduct = function (product) {
        ProductFactory.deleteProduct(product);
    };

    $scope.status = {
        isFirstOpen: true,
        isFirstDisabled: false
    };
});
