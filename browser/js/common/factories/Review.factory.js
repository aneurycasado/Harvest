app.factory('ReviewService', function ($http) {
    function getAll() {
        return $http.get('/api/reviews').then(function (response) {
            return response.data;
        });
    }

    function getOne(productID) {
        return $http.get('/api/reviews/' + productID).then(function (response) {
            return response.data;
        });
    }

    function updateOne(review) {
      console.log(review);
      return $http.put('/api/reviews', review)
        .then(function (response) {
          return response.data;
        });
    }
    return {
        getAll: getAll,
        getOne: getOne,
        updateOne: updateOne
    };
});
