app.config(function ($stateProvider) {
    $stateProvider.state('orderReceipt', {
        url: ':id/receipt',
        templateUrl: 'js/orderReceipt/orderReceipt.html',
        resolve: {
            order: function ($stateParams,OrderService) {
                console.log("orderReceipt State");
                console.log($stateParams);
                return OrderService.getOne($stateParams.id);
            }
        },
        controller: 'OrderReceiptController'
    });
});
