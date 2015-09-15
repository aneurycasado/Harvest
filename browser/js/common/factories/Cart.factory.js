app.factory('CartService', function ($http) {
    var obj = {
        addToCart: addToCart,
        getCart: getCart,
        currentCart: null,
    };
    function addToCart(product) {
        return $http.put('/api/cart/' + product._id)
            .then(function (response) {
            	obj.currentCart = response.data;
            	console.log('obj', obj.currentCart.contents.length);
                return response.data;
            });
    }
    function getCart(userID) {
        return $http.get('/api/cart/' + userID)
            .then(function (response) {
                return response.data;
            });
    }
    return obj;
});
