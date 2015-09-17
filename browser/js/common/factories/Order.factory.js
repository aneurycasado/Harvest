app.factory('OrderFactory', function ($http) {
	function getAllForUser(){
		return $http.get('/api/orders/all/user').then(response => response.data);
	}

	function getAll(){
		return $http.get('/api/orders/').then(response => response.data);
	}

	function getOne(id){
		return $http.get('/api/orders/' + id).then(response => response.data);
	}

	function createOrder(user,order){
		if(user === undefined) user = "guest";
		return $http.post('/api/orders/'+user,order).then(response => response.data);
	}

	function updateOrder (order) {
		console.log('got to the factory', order);
		return $http.put('/api/orders', order).then(response => response.data);
	}

	return {
		getAllForUser,
		getAll,
		getOne,
		createOrder,
		updateOrder
	};

});
