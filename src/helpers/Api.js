const SERVER_PREFIX = "http://localhost:8080/Eventbrite-war/webresources";

let token = "";

const Api = {

	authenticate(customer) {
		return fetch(`${SERVER_PREFIX}/authentication`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(customer)
		}).then((response) => {
			if (!response.ok) {
			  throw new Error('Failed to authenticate');
			}
			return response.json();
		  })
		  .then((data) => {
			token = data.token;
			console.log(token);
		  });
	},

	searchEvents(title) {
		return fetch(`${SERVER_PREFIX}/events/query?title=${title}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			}
		}); 
	},

	getCustomer(cId) {
		return fetch(`${SERVER_PREFIX}/customers/${cId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			}
		});
	},

};

export default Api;