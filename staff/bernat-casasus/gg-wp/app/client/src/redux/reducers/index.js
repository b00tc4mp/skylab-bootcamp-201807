import { combineReducers } from 'redux'
import registerReducer from './registerReducer'
import loginReducer from './loginReducer'
import sessionReducer from './sessionReducer'
import showResultsReducer from './showResultsReducer'
import leagueReducer from './leagueReducer'
import liveGameReducer from './liveGameReducer'
import searchBarReducer from './searchBarReducer'
import collectionReducer from './collectionReducer'
import spectateGameReducer from './spectateGameReducer'

export default combineReducers({
    register: registerReducer,
    login: loginReducer,
    session: sessionReducer,
    summoner: showResultsReducer,
    league: leagueReducer,
    liveGame: liveGameReducer,
    searchBar: searchBarReducer,
    collection: collectionReducer,
    spectate: spectateGameReducer
})