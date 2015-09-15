app.factory('CartService', function ($http) {
    function addToCart(product) {
        return $http.put('/api/cart/' + product._id)
            .then(function (response) {
                return response.data;
            });
    }
    return {
        addToCart: addToCart
    };
});
