app.directive('productAccordionDirective',function(){
  return {
    restrict: 'E',
    templateUrl: '/js/common/directives/productAccordion/productAccordion.html',
    controller: 'ProductAccordionCtrl',
    link: function (scope, element, attr, ctrl) {
    	element.bind('keypress', function (e) {
    		console.log(scope.products[0]);
    	});
    }
  };
});
