module.exports = {

	SERVER_HOSTNAME: '127.0.0.1',

	SERVER_PORT: 3000,

	DATABASE_URL: 'mongodb://localhost:27017',

	DATABASE_NAME: 'webjump',

	LOG: {
		INFO: {
			DIR_NAME: 'logs/info',
			FILE_NAME: 'webjump-info.log'
		},
		ERROR: {
			DIR_NAME: 'logs/error',
			FILE_NAME: 'webjump-error.log'
		}
	}

};