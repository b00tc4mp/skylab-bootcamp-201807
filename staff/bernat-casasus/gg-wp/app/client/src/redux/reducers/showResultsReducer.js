import { SET_SUMMONER_DATA, SET_SUMMONER_ERROR, SET_SUMMONER_PENDING } from '../actions/types'

export default function showResultsReducer(state = {
    summonerData: null,
    summonerError: null,
    isSummonerPending: null,
}, action) {
    switch (action.type) {
        case SET_SUMMONER_DATA:
            return Object.assign({}, state, {
                summonerData: action.summonerData
            });

        case SET_SUMMONER_ERROR:
            return Object.assign({}, state, {
                summonerError: action.summonerError
            });

        case SET_SUMMONER_PENDING:
            return Object.assign({}, state, {
                isSummonerPending: action.isSummonerPending
            });

        default:
            return state;
    }
}