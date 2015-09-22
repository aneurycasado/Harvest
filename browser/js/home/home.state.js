app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        resolve: {
            products: ProductFactory => ProductFactory.getAll()
        },
        controller: 'HomeCtrl'
    });
});

app.directive('sticky', function($window) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      angular.element($window).ready(function() {
        var botCutoff = $window.pageYOffset - 220,
            topPadding = 85;
        console.log($window)
        angular.element($window).on('scroll',(function() {
          if ($window.scrollY > offset) {
          	console.log($window.scrollY);
          } else {
            element.stop().animate({
              marginTop: 0
            });
          }
        }));
      });
    }
  };
});

