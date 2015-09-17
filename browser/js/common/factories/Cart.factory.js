app.factory('CartService', function ($http) {
    var obj = {
        getCart: getCart,
        addToCart: addToCart,
        removeFromCart: removeFromCart,
        updateCart: updateCart,
        getLocalCart: getLocalCart,
        currentCart: null
    };
    function getCart(userID) {
        if(localStorage.getItem("cart")){
          console.dir("cart in localStorage ", localStorage.getItem("cart"));
          return localStorage.getItem('cart');
        }else{
          console.log("non local storage");
          return $http.get('/api/cart/' + userID)
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
          return $http.put('/api/cart/' + product._id)
              .then(function (response) {
                  obj.currentCart = response.data;
                  return response.data;
              });
        }
    }
    function removeFromCart (product, cartID) {
      return $http.put('/api/cart/' + cartID + '/' + product._id)
      .then(
        function (response) {
          obj.currentCart = response.data;
          return response.data;
        }
      );
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
         console.dir(obj.currentCart);
      }
    }
    function removeFromLocalCart(product){
    }
    return obj;
});
