app.config(function ($stateProvider) {
    $stateProvider.state('orderReceipt', {
        url: ':id/receipt',
        templateUrl: 'js/orderReceipt/orderReceipt.html',
        resolve: {
            order: ($stateParams,OrderFactory) => OrderFactory.getOne($stateParams.id)
        },
        controller: 'OrderReceiptController'
    });
});
