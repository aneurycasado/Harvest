app.factory('ProductFactory', function ($http) {
    function getAll() {
        return $http.get('/api/products').then(response => response.data);
    }

    function getOne(id) {
        return $http.get('/api/products/' + id).then(response => response.data);
    }

    function getProductsByCategory(category) {
        if(category === 'All') return getAll();
        return $http.get('/api/products/category/' + category).then(response => response.data);
    }

    function updateProduct(product) {
        return $http.put('/api/products/' + product._id, product)
            .then(function (response) {
                return response.data;
            });
    }

    function addProduct(product) {
        return $http.post('/api/products', product).then(response => response.data);
    };

    function deleteProduct(product) {
        return $http({
            method: 'DELETE',
            url: 'api/products',
            data: product,
            headers: {"Content-Type": "application/json;charset=utf-8"}
        }).then(response => response.data);
    };

    return {
        getAll,
        getOne,
        getProductsByCategory,
        updateProduct,
        addProduct,
        deleteProduct
    };
});
