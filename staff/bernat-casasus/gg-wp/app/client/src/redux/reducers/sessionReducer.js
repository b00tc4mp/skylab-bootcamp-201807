import { SET_SESSION_STATE } from '../actions/types'

export default function sessionReducer(state = {
    isLoggedIn: false
}, action) {
    switch (action.type) {
        case SET_SESSION_STATE:
            return Object.assign({}, state, {
                isLoggedIn: action.isLoggedIn
            });

        default:
            return state;
    }
}