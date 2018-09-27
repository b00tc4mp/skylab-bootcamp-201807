# Jaquematic 3000 Client

## Instructions

### Running the application

1. Enter the correct values in the .env file

- PORT = 3000  // the port the application will run on
- JWT_SECRET = a secret phrase // JWT secret phrase, should match the server's
- MONGO_URL = mongodb://localhost:27017/chessserver // mongo url for testing
- REACT_APP_SOCKET_SERVER_URL = http://localhost:8080 // the URL of the server
- REACT_APP_API_SERVER_URL = http://localhost:8080/api  // the URL of the server for REST API calls



2. start the application

```sh
$ npm start
```

### Building the distribution package

```sh
$ npm run build
```

### Deploying the package in surge

1. run surge

```sh
$ surge
```

2. enter credentials (if they are asked)

3. enter the folder from which to deploy (```build```)

### Running tests

1. run the tests in mocha

```sh
$ mocha src/logic
```