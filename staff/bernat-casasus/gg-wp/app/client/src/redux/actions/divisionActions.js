import { SET_DIVISION } from '../actions/types'

export const division = (currentRank, currentRankNum ) => {
    return dispatch => {
        dispatch(setDivision(currentRank,currentRankNum))
    }
}

function setDivision(currentRank, currentRankNum) {
    return {
        type: SET_DIVISION,
        currentDivision: {currentRank, currentRankNum}
    };
}



