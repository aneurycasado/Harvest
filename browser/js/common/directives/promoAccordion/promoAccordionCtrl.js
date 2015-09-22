app.controller('PromoAccordionCtrl', function ($scope, $state, PromoFactory) {
    $scope.oneAtATime = true;
    $scope.showNewPromo = false;

    $scope.updatePromo = function (promo) {
        PromoFactory.updatePromo(promo);
        $state.reload();
    };

    $scope.showNewPromoForm = function () {
        $scope.showNewPromo = true;
    };

    $scope.createPromo = function (promo) {
        PromoFactory.createPromo(promo);
    };

    $scope.deletePromo = function (promo) {
        PromoFactory.deletePromo(promo);
    };

    $scope.status = {
        isFirstOpen: true,
        isFirstDisabled: false
    };
});
