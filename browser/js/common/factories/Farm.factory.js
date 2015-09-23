app.factory('FarmFactory', function ($http) {
  var factory = {}

  factory.getAll = function(){
    return $http.get("/api/farms/").then(response=>response.data)
  }

  factory.getOne = function(id){
    console.log("Called");
    console.dir(id);
    return $http.get("/api/farms/"+id).then(response=>response.data)
  }

  factory.getMyFarm = function(){
    console.log("Called");
    return $http.get("/api/farms/me/farm/").then(response=>response.data)
  }

  factory.createOne = function(farm){
    return $http.post('/api/farms/',farm).then(response=>response.data);
  }

  factory.updateFarm = function(id,info){
    console.log("Info ", info);
    return $http.put("/api/farms/"+id,info).then(response=>response.data);
  }

  factory.addFarmProduct = function(id,product){
    return $http.post("/api/farms/"+id, product).then(response=>response.data);
  }

  return factory;
});
