app.factory('ProductService', function ($http) {
    function getAll() {
        return $http.get('/api/products').then(function (response) {
            return response.data;
        });
    }

    function getOne(id) {
        return $http.get('/api/products/' + id).then(function (response) {
            return response.data;
        });
    }

    function getProductsByCategory(category) {
        if(category === 'All') return getAll();
        return $http.get('/api/products/category/' + category).then(function (response) {
            return response.data;
        });
    }

    function updateProduct(product) {
        return $http.put('/api/products/' + product._id, product)
            .then(function (response) {
                return response.data;
            });
    }

    function refineProducts(searchInput){
      return $http.get("/api/products/search/" + searchInput).then(function(response){
        return response.data;
      });
    }

    return {
        getAll: getAll,
        getOne: getOne,
        getProductsByCategory: getProductsByCategory,
        updateProduct: updateProduct,
        refineProducts: refineProducts
    };
});
