const env = process.env;
const config = {
	db: {
		url: env.LI_DB_URI
	},
	google: {
		access_token: env.GOOGLE_ACCESS_TOKEN,
		refresh_token: env.GOOGLE_REFRESH_TOKEN,
		client_id: env.GOOGLE_CLIENT_ID,
		client_secret: env.GOOGLE_CLIENT_SECRET,
		file_id: env.GOOGLE_FILE_ID
	}
};

export default config;
