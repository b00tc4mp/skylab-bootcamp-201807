import * as actions from './actions'
import { combineReducers } from 'redux'

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.SET_VIDEOS:
      return Object.assign({}, state, { videos: action.videos })
    case actions.SET_DATASETS:
      return Object.assign({}, state, { datasets: action.datasets })
    default:
      return state
  }
}

const videoReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.SET_VIDEO:
      const newVideo = {
        url: action.video.url,
        id: action.video.id
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

const rootReducer = combineReducers({
  user: userReducer,
  video: videoReducer,
  layout: layoutReducer,
  settings: settingsReducer
})

export default rootReducer