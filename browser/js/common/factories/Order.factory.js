app.factory('OrderService', function ($http) {
	function getAll(){
		return $http.get('/api/orders/user').then(function(response){
			return response.data;
		});
	}

	return {
		getAll: getAll
	};

});
