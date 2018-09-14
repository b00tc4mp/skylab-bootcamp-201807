# GG.WP Api

## Instructions

### Running the application

1. get a new Riot Games api key  [here](https://developer.riotgames.com/)

2. start the application

```sh
$ npm start
```

### Api Endpoints

#### Game
1. Retrive summuner summary information

```sh
method: GET
route: /game/summary/:username
```
2. Retrive league by league id

```sh
method: GET
route: /game/league/:leagueid
```

3. Retrive onlythe players information of the live game info by summoner id

```sh
method: GET
route: /game/live/:summonerid
```

4. Retrive full game info by game id

```sh
method: GET
route: /game/spectate/:summonerid
```

5. Retrive summoner basic information

```sh
method: GET
route: /game/summary/preview/:summonerid
```


#### Users
1. Register user

```sh
method: POST
route: /user/register
```
2. Authenticate user

```sh
method: POST
route: /user/authenticate
```

3. Update Password

```sh
method: PATCH
route: /user/:email
```

4. Delete User

```sh
method: DELETE
route: /user/:email
```

5. Follow Summoner

```sh
method: POST
route: /user/:email
```
6. User collection

```sh
method: GET
route: /user/:email
```
7. Delete user from collection

```sh
method: DELETE
route: /user/:email/summoner/:id
```


### Running tests

1. open your colsone, get into the project root.

```sh
$ mocha logic
```