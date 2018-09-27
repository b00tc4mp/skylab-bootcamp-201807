import { SET_LIVE_GAME_DATA } from '../actions/types'

export default function leagueReducer(state = {
    liveGameData: null
}, action) {
    switch (action.type) {
        case SET_LIVE_GAME_DATA:
            return Object.assign({}, state, {
                liveGameData: action.liveGameData
            });

        default:
            return state;
    }
}