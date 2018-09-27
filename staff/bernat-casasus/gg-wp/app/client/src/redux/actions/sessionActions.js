import { SET_SESSION_STATE } from '../actions/types'

export const session = (state) => {
  return dispatch => {
    dispatch(setSession(state))
  }
}

function setSession(isLoggedIn) {
  return {
    type: SET_SESSION_STATE,
    isLoggedIn
  }
}

