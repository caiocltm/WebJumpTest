# WebJumpTest

## assessment-backend server

### Technologies used

RESTful API + Serving Static Files: 

  - Database:
    - ORM: Mongoose
    - MongoDB

  - Loging
	- Winston

  - Form Data Parser
	- formidable

  - Code Quality:
    - ESLint
    - Prettier

### Need to Know

-   Node.js v12.6.0.

-   NPM (Node Package Manager).

-   MongoDB Community Server installed locally on your PC. For more informations about how to install
	on Windows, Linux and MacOS, [click here](https://docs.mongodb.com/manual/administration/install-community/). 
	If you already how to install, click here to [download](https://www.mongodb.com/download-center/community).

> TIP: Recommended to install MongoDB Server as a service.

-	Set the variables on *.env.js* with yout local environment configuration.

-	Built to use minimal third party dependencies and libraries as possible.

### Funcionalities

#### Serve Static Files (HTML, JS, png and CSS).

#### Products: Complete CRUD.

- 	Create Products.

> **CHALLENGE ACCEPTED**: Product image upload.

- 	Update Products.

- 	Delete Products.

- 	Fetch Products.

#### Categories: Complete CRUD.

- 	Create Categories.

- 	Update Categories.

- 	Delete Categories.

- 	Fetch Categories.

#### Diferential: Logging.

-	**Info Logs**: Every sent request can be visualized on console or in the configurated file set in
	*.env.js* file (*LOG.INFO.DIR_NAME* + *LOG.INFO.FILE_NAME*).

-	**Error Logs**: Every throw error can be visualized on console or in the configurated file set in
	*.env.js* file (*LOG.ERROR.DIR_NAME* + *LOG.ERROR.FILE_NAME*).

### Installing & Running

First, we need to clone this repository.

```bash
$ git clone https://github.com/caiocltm/WebJumpTest.git
```

After clone the project, go to the root folder **WebJumpTest**.

```bash
$ cd WebJumpTest
```

Install the dependencies.

```bash
$ npm install
```

Confirm your configuration on *.env.js* file environment:

```javascript
	SERVER_HOSTNAME: '127.0.0.1',

	SERVER_PORT: 3000,

	DATABASE_URL: 'mongodb://localhost:27017', // Default MongoDB URL connection.

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
```

Run the server.

```bash
$ npm start
```

## Author

### Caio César Lopes Teles de Menezes 
