# Gotcha Server Setup


## Prerequisites
-----

Node Js
MongoDB

Clone repository

```
git clone https://github.com/pausanchez/gotcha.git
```


### Setup client .env file

Create an .env file with the following details, in root directory, according to needs:

```
JWT_SECRET = <XXXX>
JWT_EXP = <XXX>h
PORT = <XXXX>
MONGO_URL = mongodb://localhost:XXXX/NAME_DB

videokey = <XXXX>

```

The videokey is the personal google api key for Youtube, must be required previously.

### Server Dependancies

```
$ npm install
```

Dependencies will be installed automatically

### Run Server

```
$ npm start
```


