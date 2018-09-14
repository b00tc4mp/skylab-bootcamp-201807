import { SET_LEAGUE_DATA, SET_LEAGUE_ERROR, SET_DIVISION } from '../actions/types'
import logic from '../../logic'

export const league = (leagueId) => {
    return dispatch => {
        dispatch(setLeagueData(null))
        dispatch(setDivision('ranki','I'))
        return logic.getLeagueByLeagueId(leagueId)
            .then(res => {
                dispatch(setLeagueData(res))
            })
            .catch(error => {
                dispatch(setLeagueData({}))
                dispatch(setLeagueError(error.message))
                setTimeout(() => {
                    dispatch(setLeagueError(null))
                }, 6000)
            })

    }
}

function setLeagueData(leagueData) {
    return {
        type: SET_LEAGUE_DATA,
        leagueData
    };
}

function setLeagueError(leagueError) {
    return {
        type: SET_LEAGUE_ERROR,
        leagueError
    };
}

function setDivision(currentRank, currentRankNum) {
    return {
        type: SET_DIVISION,
        currentDivision: {currentRank, currentRankNum}
    };
}





