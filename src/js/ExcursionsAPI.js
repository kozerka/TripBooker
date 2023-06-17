class ExcursionsAPI {
	constructor() {
		this.url = 'http://localhost:3000';
	}
	loadExcursions() {
		return this._fetch();
	}

	addExcursions(data) {
		const options = {
			method: 'POST',
			body: JSON.stringify(data),
			headers: { 'Content-Type': 'application/json' },
		};

		return this._fetch(options, '/excursions');
	}
	removeExcursions(id) {
		const options = { method: 'DELETE' };
		return this._fetch(options, `/excursions/${id}`);
	}

	updateExcursions(id, data) {
		const options = {
			method: 'PUT',
			body: JSON.stringify(data),
			headers: { 'Content-Type': 'application/json' },
		};
		return this._fetch(options, `/excursions/${id}`);
	}

	addOrders(data) {
		const options = {
			method: 'POST',
			body: JSON.stringify(data),
			headers: { 'Content-Type': 'application/json' },
		};
		// return fetch(this.urlOrders, options).then((resp) => {
		// 	if (resp.ok) {
		// 		return resp.json();
		// 	}
		// 	return Promise.reject(resp);
		// });

		return this._fetch(options, '/orders');
	}

	_fetch(options, additionalPath = '/excursions') {
		const url = this.url + additionalPath;
		return fetch(url, options).then((resp) => {
			if (resp.ok) {
				return resp.json();
			}
			return Promise.reject(resp);
		});
	}
}

export default ExcursionsAPI;