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

    function refineProducts(searchInput){
      return $http.get("/api/products/search/" + searchInput).then(response => response.data);
    }

    return {
        getAll,
        getOne,
        getProductsByCategory,
        updateProduct,
        refineProducts
    };
});
