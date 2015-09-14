app.factory('ProductService', function ($http) {
  function getAll(){
    return $http.get('/api/products').then(function(response){
      return response.data
    })
  }
  return{
    getAll: getAll
  }
});
