app.factory('ReviewService', function ($http) {
  function getAll(){
    return $http.get('/api/reviews').then(function(response){
      return response.data
    });
  }
  function getOne(productID){
    return $http.get('/api/reviews/'+productID).then(function(response){
      return response.data
    });
  }
  return {
    getAll: getAll,
    getOne: getOne
  };
});
