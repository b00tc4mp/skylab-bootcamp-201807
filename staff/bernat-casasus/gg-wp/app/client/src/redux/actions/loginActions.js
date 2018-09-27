import { SET_LOGIN_PENDING, SET_LOGIN_SUCCESS, SET_LOGIN_ERROR, SET_SESSION_STATE } from '../actions/types'
import logic from '../../logic'

export const login = (email, password) => {
  return dispatch => {
    dispatch(setLoginPending(true))
    dispatch(setLoginSuccess({ status: false, message: 'Login Succesful' }))
    dispatch(setLoginError(null))

    // dispatch(setState({ isLoginPending: true, isLoginSuccess: { status: false, message: 'Login Succesful' }, loginError: null }))
    return logic.loginUser(email, password)
      .then(() => {
        dispatch(setLoginPending(false))
        setTimeout(() => {
          dispatch(setLoginSuccess({ status: false, message: 'Login Succesful' }))
        }, 2000)
        dispatch(setLoginSuccess({ status: true, message: 'Login Succesful' }))
        dispatch(setSession(true))
        // dispatch(setState({ isLoginPending: false, isLoginSuccess: { status: true, message: 'Login Succesful' }}))
      })
      .catch(error => {
        dispatch(setLoginPending(false))
        dispatch(setLoginError(error.message))
        setTimeout(() => {
          dispatch(setLoginError(null))
        }, 6000)
      })
  }
}

function setSession(isLoggedIn) {
  return {
    type: SET_SESSION_STATE,
    isLoggedIn
  }
}

function setLoginPending(isLoginPending) {
  return {
    type: SET_LOGIN_PENDING,
    isLoginPending
  };
}

function setLoginSuccess(isLoginSuccess) {
  return {
    type: SET_LOGIN_SUCCESS,
    isLoginSuccess
  };
}

function setLoginError(loginError) {
  return {
    type: SET_LOGIN_ERROR,
    loginError
  }
}

