app.factory('PromoFactory', function ($http) {
	function getAll() {
		return $http.get('/api/promos').then(response => response.data);
	}

	function getOneByCode(promo) {
		return $http.get('/api/promos/' + promo).then(response => response.data);
	}

	function updatePromo(promo) {
		return $http.put('/api/promos/' + promo._id, promo).then(response => response.data);
	}

	function createPromo(promo) {
		return $http.post('/api/promos', promo).then(response => response.data);
	}

	function deletePromo(promo) {
		return $http.delete('/api/promos/' + promo._id).then(response => response.data);
	}

	return {
		getAll,
		getOneByCode,
		updatePromo,
		createPromo,
		deletePromo
	};
});