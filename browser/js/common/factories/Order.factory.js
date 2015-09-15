app.factory('OrderService', function ($http) {
	function getAll(){
		$http.get('/api/orders/user').then(function(response){
			console.log('response from server', response);
			return response.data;
		});
	}

	return {
		getAll: getAll
	};

});
