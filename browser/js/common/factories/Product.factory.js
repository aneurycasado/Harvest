app.factory('ProductService', function ($http) {
  function getAll(){
    return $http.get('/api/products').then(function(response){
      return response.data;
    });
  }
  function getProductsByCategory (category) {
    return $http.get('/api/products/'+category).then(function(response){
      return response.data;
    });
  }
  return{
    getAll: getAll,
    getProductsByCategory: getProductsByCategory,
  };
});
