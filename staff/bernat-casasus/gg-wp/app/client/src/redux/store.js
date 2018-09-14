import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';
import rootReducer from './reducers';
import logic from '../logic'

const initialState = { session: {isLoggedIn: logic.isLoggedIn}, summoner: { summonerData: null } }
const middleware = [thunk]

const store = createStore(
    rootReducer,
    initialState,

        applyMiddleware(...middleware)
        

);

export default store;

