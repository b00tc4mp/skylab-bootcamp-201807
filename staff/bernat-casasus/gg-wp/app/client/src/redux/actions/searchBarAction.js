import { SET_SEARCH_STATE } from '../actions/types'

export const toggleSearchBar = (state) => {
    return dispatch => {
        dispatch(setSearch(state))
    }
}

function setSearch(isSearchBarActive) {
    return {
        type: SET_SEARCH_STATE,
        isSearchBarActive
    }
}

