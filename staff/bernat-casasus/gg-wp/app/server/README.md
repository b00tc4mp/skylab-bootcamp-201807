# GG.WP App

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
/game/summary/:username
```
2. Retrive league by league id

```sh
/game/league/:leagueid
```

3. Retrive onlythe players information of the live game info by summoner id

```sh
/game/live/:summonerid
```

4. Retrive full game info by game id

```sh
/game/spectate/:summonerid
```

5. Retrive summoner basic information

```sh
/game/summary/preview/:summonerid
```

### Running tests

1. open your colsone, get into the project root.

```sh
$ mocha logic
```