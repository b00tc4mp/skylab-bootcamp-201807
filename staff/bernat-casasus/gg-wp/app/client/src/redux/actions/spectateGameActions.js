import { SET_SPECTATE_GAME_DATA, SET_SPECTATE_GAME_PENDING, SET_SPECTATE_GAME_ERROR } from '../actions/types'
import logic from '../../logic'

export const spectateGame = (summonerId) => {
    return dispatch => {
        dispatch(setSpectateGameData(null))
        dispatch(setSpectateGamePending(true))
        return logic.getSpectateGameBySummonerId(summonerId)
            .then(data => {
                dispatch(setSpectateGameData(data))
                dispatch(setSpectateGamePending(false))
            })
            .catch(error => {
                dispatch(setSpectateGameError(error.message))
                dispatch(setSpectateGamePending(false))
            })

    }
}

function setSpectateGameData(spectateGameData) {
    return {
        type: SET_SPECTATE_GAME_DATA,
        spectateGameData
    };
}
function setSpectateGamePending(isSpectateGamePending) {
    return {
        type: SET_SPECTATE_GAME_PENDING,
        isSpectateGamePending
    };
}
function setSpectateGameError(spectateGameError) {
    return {
        type: SET_SPECTATE_GAME_ERROR,
        spectateGameError
    };
}




