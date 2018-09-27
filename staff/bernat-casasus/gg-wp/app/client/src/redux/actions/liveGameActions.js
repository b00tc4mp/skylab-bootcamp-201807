import { SET_LIVE_GAME_DATA,SET_LIVE_GAME_ERROR } from '../actions/types'
import logic from '../../logic'

export const liveGame = (summonerId) => {
    return dispatch => {
        dispatch(setLiveGameData(null))
        return logic.getLiveGameBySummonerId(summonerId)
            .then(data => {
                console.log('action live',data)
                dispatch(setLiveGameData(data))
            })
            .catch(error => {
                dispatch(setLiveGameData({}))
            })

    }
}

function setLiveGameData(liveGameData) {
    return {
        type: SET_LIVE_GAME_DATA,
        liveGameData
    };
}




