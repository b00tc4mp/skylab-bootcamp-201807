import { SET_REGISTER_PENDING, SET_REGISTER_SUCCESS, SET_REGISTER_ERROR, SET_STATE } from '../actions/types'
import logic from '../../logic'

export const register = (email, password) => {
  return dispatch => {
    dispatch(setState({ isRegisterPending: true, isRegisterSuccess: { status: false, message: 'Register Succesful' }, registerError: null }))

    return logic.registerUser(email, password)
      .then(() => {
        dispatch(setRegisterPending(false))
        dispatch(setRegisterSuccess({ status: true, message: 'Register Succesful' }))
        setTimeout(() => {
          dispatch(setRegisterSuccess({ status: false, message: 'Register Succesful' }))
        }, 2000)
      })
      .catch(error => {
        dispatch(setRegisterPending(false))
        dispatch(setRegisterError(error.message))
        setTimeout(() => {
          dispatch(setRegisterError(null))
        }, 6000)
      })
  }
}

function setState(newState) {
  return {
    type: SET_STATE,
    newState
  }
}

function setRegisterPending(isRegisterPending) {
  return {
    type: SET_REGISTER_PENDING,
    isRegisterPending
  };
}

function setRegisterSuccess(isRegisterSuccess) {
  return {
    type: SET_REGISTER_SUCCESS,
    isRegisterSuccess
  };
}

function setRegisterError(registerError) {
  return {
    type: SET_REGISTER_ERROR,
    registerError
  }
}

