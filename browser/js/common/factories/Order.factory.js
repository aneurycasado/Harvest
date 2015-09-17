app.factory('OrderService', function ($http) {
	function getAllForUser(){
		return $http.get('/api/orders/all/user').then(function(response){
			return response.data;
		});
	}

	function getAll(){
		return $http.get('/api/orders/').then(function(response){
			return response.data;
		});
	}

	function getOne(id){
		return $http.get('/api/orders/' + id).then(function(response){
			return response.data;
		})
	}

	function createOrder(user,order){
		if(user === undefined) user = "guest";
		return $http.post('/api/orders/'+user,order).then(function(response){
			return response.data;
		});
	}

	function formatDates (allOrders) {
			var monthNames = [
				  "January", "February", "March",
				  "April", "May", "June", "July",
				  "August", "September", "October",
				  "November", "December"
			];
			allOrders.forEach(function(order){
				order.dateOfOrder = new Date(order.dateOfOrder);
				var day = order.dateOfOrder.getDate();
				var monthIndex = order.dateOfOrder.getMonth();
				var month = monthNames[monthIndex];
				var year = order.dateOfOrder.getFullYear();
				order.dateOfOrder = {};
				order.dateOfOrder.day = day;
				order.dateOfOrder.month = month;
				order.dateOfOrder.year = year;
			});
	}

	return {
		getAllForUser,
		getAll: getAll,
		getOne: getOne,
		formatDates: formatDates,
		createOrder: createOrder
	};

});
