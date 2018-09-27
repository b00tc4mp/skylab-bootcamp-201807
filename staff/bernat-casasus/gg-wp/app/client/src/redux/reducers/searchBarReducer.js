import { SET_SEARCH_STATE } from '../actions/types'

export default function sessionReducer(state = {
    isSearchBarActive: true
}, action) {
    switch (action.type) {
        case SET_SEARCH_STATE:
            return Object.assign({}, state, {
                isSearchBarActive: action.isSearchBarActive
            });

        default:
            return state;
    }
}