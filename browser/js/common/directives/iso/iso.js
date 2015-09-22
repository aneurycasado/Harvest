app.directive("iso",function(){
  return{
    restrict: "E",
    link: function(scope,element){
      var iso = new Isotope( element[0], {
        itemSelector: '.isotope-item',
        layoutMode: 'fitRows'
      });
      // element[0].iso({filter: '.dairy'})
      iso.arrange({
        // item element provided as argument
        filter: function( itemElem ) {
          //where has class dairy
        }
      });
      var filterFns = {
        dairyCategory: function(){
          var category = this.find('.category').text();
          return category === "Dairy";
        },
        fruitCategory: function(){
          var category = this.find('.category').text();
          return category === "dairy";
        },
        vegetableCategory: function(){
          var category = this.find('.category').text();
          return category === "dairy";
        }
      }
      angular.element("form-control").on('change',function(){
        console.log(this);
      });
    }
  }
});
