app.controller('PersonalizeController', function($scope,$state, products,userOrders,allOrders, ProductFactory, CartFactory){
  $scope.fruitOrderedByAll = 0;
  $scope.dairyOrderedByAll = 0;
  $scope.vegetablesOrderedByAll = 0;
  $scope.fruitOrderedByYou = 0;
  $scope.dairyOrderedByYou = 0;
  $scope.vegetablesOrderByYou = 0;
  $scope.recommendedProducts = [];
  $scope.othersBought = [];
  $scope.maxCat = ""
  var totalProducts = 4;
  userOrders.forEach(function(order){
    order.items.forEach(function(item){
      if(item.category === "Fruit"){
        $scope.fruitOrderedByYou++;
      }else if(item.category === "Dairy"){
        $scope.dairyOrderedByYou++;
      }else if(item.category === "Vegetables"){
        $scope.vegetablesOrderByYou++
      }
    })
  });
  $scope.mostCommonProducts = {};
  if($scope.fruitOrderedByYou > $scope.vegetablesOrderByYou && $scope.fruitOrderedByYou > $scope.dairyOrderedByYou){
    $scope.maxCat = "Fruit";
  }else if($scope.dairyOrderedByYou > $scope.vegetablesOrderByYou && $scope.dairyOrderedByYou > $scope.fruitOrderedByYou){
    $scope.maxCat = "Dairy";
  }else if($scope.vegetablesOrderByYou > $scope.dairyOrderedByYou && $scope.vegetablesOrderByYou> $scope.fruitOrderedByYou){
    $scope.maxCat = "Vegetables";
  }
  products.forEach(function(product){
    if(product.category === $scope.maxCat){
      $scope.recommendedProducts.push(product);
    }
  });
  allOrders.forEach(function(order){
    order.items.forEach(function(item){
      if($scope.mostCommonProducts[item.title]){
        $scope.mostCommonProducts[item.title]++;
      }else{
        $scope.mostCommonProducts[item.title] = 1;
      }
    })
  })
  var maxProduct = null;
  var maxProductCount = null
  var maxProducts = [];
  for(var key in $scope.mostCommonProducts){
    var obj = {title: key, count: $scope.mostCommonProducts[key]}
    maxProducts.push(obj);
  }
  var sorted = _.sortBy(maxProducts,"count").reverse();
  var mostCommonProducts = sorted.slice(0, totalProducts);
  var othersBought = [];
  mostCommonProducts.forEach(function(commonProduct){
    products.forEach(function(product){
      if(commonProduct.title === product.title){
        othersBought.push(product);
      }
    });
  });
  $scope.othersBought = othersBought;

  $scope.addToCart = function (product) {
    CartFactory.addToCart(product);
  };
  $scope.goToProduct = function (product) {
      console.log(product);
      var productID = product._id;
      $state.go('productDetail', {
          id: productID
      });
  };

});
