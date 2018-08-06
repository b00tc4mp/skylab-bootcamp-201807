# Spotify App

## Instructions

### Running the application

1. get a new spotify token [here](https://developer.spotify.com/console/get-search-item/)

2. update the token in ```src/App.js```

```js
logic.spotifyToken = 'BQBaXXqjjeR2ee0FJ5K5XzQLdRW0OjLTg-GaQnArZbw8uHxaL9OFVgWAZZGNMASBkbju9avKC3MOXbByzMXgpCjTHvUaGatOc5yyS9yN-8t9tZOj7fvxL6rWemtHN7ePKvCdnYwtmtNy'
```

3. start the application

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

1. get a new spotify token [here](https://developer.spotify.com/console/get-search-item/)

2. update the token in ```src/logic/index.spec.js```

```js
logic.spotifyToken = 'BQBaXXqjjeR2ee0FJ5K5XzQLdRW0OjLTg-GaQnArZbw8uHxaL9OFVgWAZZGNMASBkbju9avKC3MOXbByzMXgpCjTHvUaGatOc5yyS9yN-8t9tZOj7fvxL6rWemtHN7ePKvCdnYwtmtNy'
```

3. open the specs runner in browser

```sh
$ open SpecRunner.html
```
