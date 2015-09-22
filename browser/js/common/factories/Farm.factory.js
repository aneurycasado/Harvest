app.factory('FarmFactory', function ($http) {
  var factory = {}

  factory.getAll = function(){
    return $http.get("/api/farms/").then(response=>response.data)
  }

  factory.getOne = function(id){
    return $http.get("/api/farms/"+id).then(response=>response.data)
  }

  return factory;
});
