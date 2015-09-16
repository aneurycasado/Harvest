app.controller('AboutController', function ($scope, FullstackPics) {
    $scope.images = _.shuffle(FullstackPics);
});
