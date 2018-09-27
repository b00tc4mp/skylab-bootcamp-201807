import * as actions from './actions'
import { combineReducers } from 'redux'

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.SET_VIDEOS:
      return Object.assign({}, state, { videos: action.videos })
    case actions.SET_DATASETS:
      return Object.assign({}, state, { datasets: action.datasets })
    case actions.SET_RESULTS:
      return Object.assign({}, state, { results: action.results })
    case actions.SET_MODELS:
      return Object.assign({}, state, { models: action.models })
    default:
      return state
  }
}

const videoReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.SET_VIDEO:
      const newVideo = {
        url: action.video.url,
        id: action.video.id,
        type: action._type
      }
      return Object.assign({}, state, newVideo)
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

const actionsReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.SET_ACTIONS:
      return Object.assign({}, state, action.actions)
    default:
      return state
  }
}

const rootReducer = combineReducers({
  user: userReducer,
  video: videoReducer,
  layout: layoutReducer,
  settings: settingsReducer,
  actions: actionsReducer
})

export default rootReducer