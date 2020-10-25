const apiURL = process.env.REACT_APP_API_URL;

async function client(
	endpoint,
	{ data, token, headers: customHeaders, ...customConfig } = {}
) {
	const config = {
		method: data ? 'POST' : 'GET',
		body: data ? JSON.stringify(data) : undefined,
		headers: {
			Authorization: token ? `Bearer ${token}` : undefined,
			'Content-Type': data ? 'application/json' : undefined,
			...customHeaders,
		},
		...customConfig,
	};

	return window
		.fetch(`${apiURL}/${endpoint}`, config)
		.then(async (response) => {
			if (response.status === 401) {
				// Here the function to logout and clear cache (WIP)
				// refresh the page
				window.location.assign(window.location);
				return Promise.reject({
					message: 'Por favor, inicie sesión nuevamente.',
				});
			}
			const data = await response.json();
			if (response.ok) {
				return data;
			} else {
				return Promise.reject(data);
			}
		});
}

export { client };
