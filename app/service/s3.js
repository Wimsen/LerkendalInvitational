export async function getSignedUrl(s3key) {
	let headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		auth: `Bearer: ${localStorage.getItem('id_token')}`
	};

	return new Promise(async (resolve, reject) => {
		try {
			let response = await fetch(`/s3/img/${s3key}`, {
				method: 'GET',
				headers: headers
			});
			if (response.ok) {
				resolve(response.url);
			} else {
				reject(response);
			}
		} catch (error) {
			console.log(error);
			reject('');
		}
	});
}
