app.controller('UserAccordionCtrl', function ($scope, $state, UserFactory) {
    $scope.oneAtATime = true;
    $scope.showAddUser = false;
    $scope.items = ['Item 1', 'Item 2', 'Item 3'];
    $scope.addItem = function () {
        var newItemNo = $scope.items.length + 1;
        $scope.items.push('Item ' + newItemNo);
    };

    $scope.updateUser = function (user) {
        for (var k in $scope.currentUser) {
            if (user[k] === '') {
                user[k] = $scope.currentUser;
            }
        }
        if (!user._id) {
         user._id = $scope.currentUser._id;
        }
        UserFactory.updateUser(user)
            .then(function (updatedUser) {
                if ($scope.currentUser) {
                    $scope.currentUser = updatedUser;
                    window.location.reload();
                }
            });
    };

    $scope.deleteUser = function (user) {
        UserFactory.deleteUser(user);
    };

    $scope.showAddUserForm = function () {
        $scope.showAddUser = true;
    };

    $scope.createUser = function (user) {
        console.log(user);
        UserFactory.createUser(user);
    };

    $scope.status = {
        isFirstOpen: true,
        isFirstDisabled: false
    };
});
