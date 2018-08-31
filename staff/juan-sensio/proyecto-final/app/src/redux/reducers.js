import * as actions from "./actions"
import { combineReducers } from "redux";

// user

const userInitialState = {
  loggedIn: false
}

const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case actions.LOGIN:
      return Object.assign({}, state, { loggedIn: action.loggedIn })
    default:
      return state
  }
};

// layout

const initialLayout = {
  layout: true,
  workspace: true,
  profile: true,
  settings: false,
  help: false
}

const layoutReducer = (state = initialLayout, action) => {
  switch (action.type) {
    case actions.SET_LAYOUT:
      return Object.assign({}, state, { 
          layout: action.layout.layout,
          workspace: action.layout.workspace,
          profile: action.layout.profile,
          settings: action.layout.settings,
          help: action.layout.help,
        })
    default:
      return state
  }
};

// app

const appInitialState = {
  mainVideoSrc: '',
  ISF: 0,
  OS: 0,
  FH: false, 
  MAX_DIM: 0,
  FPS: 0,
  REF_RATE: 0
}

const appReducer = (state = appInitialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

// combine reducers

const rootReducer = combineReducers({
  user: userReducer,
  layout: layoutReducer,
  app: appReducer
})

export default rootReducer