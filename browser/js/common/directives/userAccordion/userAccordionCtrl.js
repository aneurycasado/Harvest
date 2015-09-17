app.controller('UserAccordionCtrl', function ($scope, UserFactory) {
    $scope.oneAtATime = true;

    $scope.items = ['Item 1', 'Item 2', 'Item 3'];

    $scope.addItem = function () {
        var newItemNo = $scope.items.length + 1;
        $scope.items.push('Item ' + newItemNo);
    };

    $scope.updateUser = function (user) {
        console.log(user);
        UserFactory.updateUser(user);
    };

    $scope.status = {
        isFirstOpen: true,
        isFirstDisabled: false
    };
});
