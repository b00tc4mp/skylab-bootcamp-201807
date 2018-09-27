import { SET_LEAGUE_DATA, SET_LEAGUE_ERROR, SET_DIVISION } from '../actions/types'

export default function leagueReducer(state = {
    leagueData: null,
    leagueError: null,
    currentDivision: {currentRank: 'ranki',currentRankNum:'I'}
}, action) {
    switch (action.type) {
        case SET_LEAGUE_DATA:
            return Object.assign({}, state, {
                leagueData: action.leagueData
            });

        case SET_LEAGUE_ERROR:
            return Object.assign({}, state, {
                leagueError: action.leagueError
            });

        case SET_DIVISION:
            return Object.assign({}, state, {
                currentDivision: action.currentDivision
            });

        default:
            return state;
    }
}