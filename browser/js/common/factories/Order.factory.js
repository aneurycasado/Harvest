app.factory('OrderService', function ($http) {
	function getAll(){
		return $http.get('/api/orders/user').then(function(response){
			return response.data;
		});
	}

	function createOrder(user,order){
		console.log("User in factory ", user);
		console.log("Order in factory ", order);
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
			console.log('allorders = ',allOrders);
			allOrders.forEach(function(order){
				order.dateOfOrder = new Date(order.dateOfOrder);
				console.log('order.dateOfOrder = ',order.dateOfOrder, typeof order.dateOfOrder);
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
		getAll: getAll,
		formatDates: formatDates,
		createOrder: createOrder
	};

});
