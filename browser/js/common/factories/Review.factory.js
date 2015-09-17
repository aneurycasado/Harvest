app.factory('ReviewService', function ($http) {
  function getAll(){
    return $http.get('/api/reviews').then(function(response){
      return response.data;
    });
  }
  function getOne(productID){
    return $http.get('/api/reviews/'+productID).then(function(response){
      return response.data;
    });
  }

  function createReview (product,newReview) {
    return $http.post('/api/reviews/'+product._id,newReview).then(function(response){
      return response.data;
    });
  }

  return {
    getAll: getAll,
    getOne: getOne,
    createReview: createReview
  };
});
