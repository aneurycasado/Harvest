app.directive('paymentInfo', function(){
  return {
    restrict: 'E',
    templateUrl: '/js/common/directives/paymentInfo/paymentInfo.html',
    controller: 'PaymentInfoController',
  }
});
