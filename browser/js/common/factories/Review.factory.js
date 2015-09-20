app.factory('ReviewFactory', function ($http) {
    function getAll() {
        return $http.get('/api/reviews').then(response => response.data
        );
    }

    function getOne(productID) {
        return $http.get('/api/reviews/' + productID).then(response => response.data);
    }

    function updateOne(review) {
        return $http.put('/api/reviews', review).then(response => response.data);
    }

    function createReview(product, newReview) {
        return $http.post('/api/reviews/', newReview).then(response => response.data);
    }
    return {
        getAll,
        getOne,
        updateOne,
        createReview
    };
});
