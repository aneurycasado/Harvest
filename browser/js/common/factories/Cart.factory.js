app.factory('CartFactory', function ($http) {
  var factory = {};
    factory.getCart = function(userID) {
        if(localStorage.getItem("cart")){
          return localStorage.getItem('cart');
        }else{
          return $http.get('/api/cart/users/' + userID)
              .then(function (response) {
                  factory.currentCart = response.data;
                  return response.data;
              });
        }
    }
    factory.addToCart = function(product) {
        if(localStorage.getItem('cart')){
          var cart = JSON.parse(localStorage.getItem('cart'));
          cart.contents.push(product);
          factory.currentCart = cart;
          localStorage.setItem("cart",JSON.stringify(cart));
        }else{
          return $http.put('/api/cart/products/' + product._id)
              .then(function (response) {
                  factory.currentCart = response.data;
                  return response.data;
              });
        }
    }

    factory.removeFromCart = function (product, cartID) {
      return $http.delete('/api/cart/' + cartID + '/products/' + product._id)
      .then(function (response) {
        factory.currentCart = response.data;
        return response.data;
      });
    }

    factory.updateCart = function (updatedCartContents, cart) {
        return $http.put('/api/cart/update/' + cart._id, {updatedCartContents: updatedCartContents})
            .then(function (response) {
                factory.currentCart = response.data;
                return response.data;
            });
    }
    factory.getLocalCart = function(){
      if(!localStorage.getItem('cart')){
        var cart = {user: 'guest',contents: []};
        localStorage.setItem('cart',JSON.stringify(cart));
        factory.currentCart = cart;
      }else{
         factory.currentCart = JSON.parse(localStorage.getItem('cart'));
      }
    }

    factory.createCartFromLocaStorage = function(cart){
      return $http.post('/api/cart/createCart/me',cart).then(response => response.data);
    }

    factory.currentCart = null;

    return factory;
});
