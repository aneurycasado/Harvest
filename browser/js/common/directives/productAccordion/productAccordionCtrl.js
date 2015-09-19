app.controller('ProductAccordionCtrl', function ($scope, $state, ProductFactory) {
    $scope.oneAtATime = true;
    $scope.showAddProduct = false;
    $scope.items = ['Item 1', 'Item 2', 'Item 3'];

    $scope.addItem = function () {
        var newItemNo = $scope.items.length + 1;
        $scope.items.push('Item ' + newItemNo);
    };

    $scope.updateProduct = function (product) {
        ProductFactory.updateProduct(product);
        $state.reload();
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
