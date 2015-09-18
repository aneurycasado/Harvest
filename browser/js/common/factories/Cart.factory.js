app.factory('CartFactory', function ($http) {
    function getCart(userID) {
        if(localStorage.getItem("cart")){
          return localStorage.getItem('cart');
        }else{
          return $http.get('/api/cart/users/' + userID)
              .then(function (response) {
                  obj.currentCart = response.data;
                  return response.data;
              });
        }
    }
    function addToCart(product) {
        if(localStorage.getItem('cart')){
          var cart = JSON.parse(localStorage.getItem('cart'));
          cart.contents.push(product);
          obj.currentCart = cart;
          localStorage.setItem("cart",JSON.stringify(cart));
        }else{
          return $http.put('/api/cart/products/' + product._id)
              .then(function (response) {
                  obj.currentCart = response.data;
                  return response.data;
              });
        }
    }

    function removeFromCart (product, cartID) {
      return $http.delete('/api/cart/' + cartID + '/products/' + product._id)
      .then(function (response) {
        obj.currentCart = response.data;
        return response.data;
      });
    }

    function updateCart (updatedCartContents, cart) {
        return $http.put('/api/cart/update/' + cart._id, {updatedCartContents: updatedCartContents})
            .then(function (response) {
                obj.currentCart = response.data;
                return response.data;
            });
    }
    function getLocalCart(){
      if(!localStorage.getItem('cart')){
        var cart = {user: 'guest',contents: []};
        localStorage.setItem('cart',JSON.stringify(cart));
        obj.currentCart = cart;
      }else{
         obj.currentCart = JSON.parse(localStorage.getItem('cart'));
      }
    }

    function createCartFromLocaStorage(cart){
      return $http.post('/api/cart/createCart/me',cart).then(response => response.data);
    }

    var obj = {
        getCart,
        addToCart,
        removeFromCart,
        updateCart,
        getLocalCart,
        createCartFromLocaStorage,
        currentCart: null
    };

    return obj;
});
