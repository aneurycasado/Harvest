app.controller('DragAndDropCtrl', function ($scope, CartFactory) {
	
    var dragImage = document.createElement('img');
	dragImage.src = 'http://www.clipartbest.com/cliparts/9Tz/MBp/9TzMBpAjc.png';
    
    $scope.handleDragStart = function (e) {
        this.style.opacity = '0.4';
        angular.element(e.dataTransfer.setData('text/html', this.attributes['data-index'].value));
        e.dataTransfer.setDragImage(dragImage, 0, 0);
    };

    $scope.handleDragEnd = function (e) {
        this.style.opacity = '1.0';
    };

    $scope.handleDrop = function (e) {
        e.preventDefault();
        e.stopPropagation();
        var product = e.dataTransfer.getData('text/html').split(">")[1];
        $scope.$apply(function () {
            CartFactory.addToCart($scope.products[product]);
        });
        this.style.transform = 'scale(1.0)';
    };

    $scope.handleDragOver = function (e) {
        e.preventDefault(); // Necessary. Allows us to drop.
        e.dataTransfer.dropEffect = 'move'; // See the section on the DataTransfer object.
        this.style.transform = 'scale(1.5)';
    	this.style.transition = 'all .5s ease-in-out';
        return false;
    };
    $scope.handleDragLeave = function (e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move'; // See the section on the DataTransfer object.
        this.style.transform = 'scale(1.0)';
        this.style.transition = '';
    };
});
