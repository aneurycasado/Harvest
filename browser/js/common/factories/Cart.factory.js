app.factory('CartService', function ($http) {
    var obj = {
        getCart: getCart,
        addToCart: addToCart,
        removeFromCart: removeFromCart,
        updateCart: updateCart,
        currentCart: null
    };
    function getCart(userID) {
        return $http.get('/api/cart/' + userID)
            .then(function (response) {
                obj.currentCart = response.data;
                return response.data;
            });
    }
    function addToCart(product) {
        return $http.put('/api/cart/' + product._id)
            .then(function (response) {
                obj.currentCart = response.data;
                return response.data;
            });
    }
    function removeFromCart (product, cartID) {
        return $http.put('/api/cart/' + cartID + '/' + product._id)
            .then(function (response) {
                obj.currentCart = response.data;
                return response.data;
            });
    }
    function updateCart (updatedCartContents, cart) {
        return $http.put('/api/cart/update/' + cart._id, {updatedCartContents: updatedCartContents})
            .then(function (response) {
                obj.currentCart = response.data;
                return response.data;
            });
    }
    return obj;
});
