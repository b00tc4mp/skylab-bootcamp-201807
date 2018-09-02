import * as actions from './actions'
import { combineReducers } from 'redux'

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.LOGIN:
      return Object.assign({}, state, { loggedIn: true })
    case actions.LOGOUT:
      return Object.assign({}, state, { loggedIn: false })
    default:
      return state
  }
}

const layoutReducer = (state = false, action) => {
  switch (action.type) {
    case actions.SET_LAYOUT:
      return action.layout
    default:
      return state
  }
}

const settingsReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.UPDATE_SETTING:
      const newSetting = {}
      newSetting[action.key] = action.value
      return Object.assign({}, state, newSetting)
    default:
      return state
  }
}

const rootReducer = combineReducers({
  user: userReducer,
  layout: layoutReducer,
  settings: settingsReducer
})

export default rootReducer