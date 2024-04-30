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
			localStorage.setItem("token", token);
		  });
	},

	searchEvents(title) {
		return fetch(`${SERVER_PREFIX}/events/query?title=${title}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			}
		}); 
	},

	getProfile() {
		return fetch(`${SERVER_PREFIX}/customers/profile`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			}
		});
	},

	createCustomer(customer) {
		return fetch(`${SERVER_PREFIX}/customers`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(customer),
		});
	}
};

export default Api;