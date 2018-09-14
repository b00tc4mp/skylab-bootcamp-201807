# Jaquematic 3000 Server

## Instructions

### Running the application

1. Enter the correct values in the .env file

- PORT = 8080 // the port the server will serve on
- JWT_SECRET = a secret phrase // JWT secret phrase, should match the client's
- JWT_EXP = 5h // JWT expiration
- MONGODB_URI = mongodb://localhost:27017/chessserver // the URL of the MONGO DB

2. start the application

```sh
$ node .
```


### Running tests

1. run the tests in mocha

```sh
$ mocha logic
```