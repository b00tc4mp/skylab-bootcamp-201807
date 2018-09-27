import { SET_SPECTATE_GAME_DATA, SET_SPECTATE_GAME_PENDING, SET_SPECTATE_GAME_ERROR } from '../actions/types'

export default function spectateGameReducer(state = {
    spectateGameData: null,
    isSpectateGamePending: false,
    spectateGameError: null

}, action) {
    switch (action.type) {
        case SET_SPECTATE_GAME_DATA:
            return Object.assign({}, state, {
                spectateGameData: action.spectateGameData
            });

        case SET_SPECTATE_GAME_PENDING:
            return Object.assign({}, state, {
                isSpectateGamePending: action.isSpectateGamePending
            });

        case SET_SPECTATE_GAME_ERROR:
            return Object.assign({}, state, {
                spectateGameError: action.spectateGameError
            });

        default:
            return state;
    }
}