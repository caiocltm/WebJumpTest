# WebJumpTest

## assessment-backend server

## Built Requisites

### **RESTful API + Serve Static Files**

### **CLI**

### **Diferential: Image Product Upload**

#### Technologies used

  - Database:
    - ORM: Mongoose
    - MongoDB

  - Loging
	- Winston

  - Form Data Parser
	- formidable

  - Inquirer
	- Command line prompt library, to make questions and get user's answer input.

  - UUID
	- Library to generate UUIDs based on RFC4122.

  - Code Quality:
    - ESLint
    - Prettier

### Need to Know

-   Node.js v12.6.0 used.

-   NPM v6.13.4 used.

-   MongoDB Server v4.2.3 used (Current release):

	-	MongoDB Community Server installed locally on your PC. For more informations about how to install
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

## import-csv : CLI (Command Line Interface)

**CLI** was builted to import a *.csv* file containing all products related data, to populate
the database (MongoDB) used on this project.

### Installing Dependencies

Go to folder *WebJumpTest/cli*:

```bash
$ cd cli/
```

Install the dependencies:

```bash
$ npm install
```

Enable this project globally on your machine (using *npm*):

> This command enables to execute the *import-csv* command in anywhere on your machine.

```bash
$ npm link
```

> ATTENTION: Run the command only on *CMD* or *bash*, i don't why, but doesn't work on *Windows Powershell*.

### Importing CSV File

To import a csv from a path, run the command, inform a full path to a .csv file:

```bash
$ import-csv

$ ? Inform the .csv file path to import => C:\complete\path\to\yout\file\products.csv

* Initializing read process...: 8.020ms

* Initializing products and categories transformation (spliting)...: 6.033ms

* Initializing categories transformation (to model pattern)...: 1.214ms

* Deleting all data from Products and Categories database...: 38.261ms

* Inserting all Category data readed to Categories database...: 32.500ms

* Transforming categories on products to valid _id attribute...: 59.718ms

* Inserting all Product data readed to Products database...: 701.231ms

** Categories inserted -> 20
** Products inserted -> 1000
```

#### CLI Validations

 **Path Exists**: Validate if the informed path really exists.

 **Is a File**: Validate if the informed path is a file.

 **Is a CSV File**: Validate if the informed file has a *.csv* extension.

## Author

### Caio César Lopes Teles de Menezes 
