app.config(function ($stateProvider) {
    $stateProvider.state('orderReceipt', {
        url: ':id/receipt',
        templateUrl: 'js/orderReceipt/orderReceipt.html',
        resolve: {
            order: function ($stateParams,OrderFactory) {
                console.log("orderReceipt State");
                console.log($stateParams);
                return OrderFactory.getOne($stateParams.id);
            }
        },
        controller: 'OrderReceiptController'
    });
});
