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
    }

    function deleteProduct(product) {
        return $http({
            method: 'DELETE',
            url: 'api/products',
            data: product,
            headers: {"Content-Type": "application/json;charset=utf-8"}
        }).then(response => response.data);
    }

    function minPrice(products) {
        return products.reduce(function(lowProd,currProd){
            return Math.min(lowProd, currProd.price);
        },products[0].price);
    }

    function maxPrice(products) {
        return products.reduce(function(highProd,currProd){
            return Math.max(highProd, currProd.price);
        }, products[0].price);
    }

    return {
        maxPrice,
        minPrice,
        getAll,
        getOne,
        getProductsByCategory,
        updateProduct,
        addProduct,
        deleteProduct
    };
});
