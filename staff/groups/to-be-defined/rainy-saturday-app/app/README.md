# Rainy Saturday App

## Instructions

### Running the application

1. get a new Rijks Museum key [here](http://rijksmuseum.github.io/)

2. update the key in ```src/App.js```

```js
museumKey: 'ROQio02r',
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

1. open the specs runner in browser

```sh
$ open SpecRunner.html
```