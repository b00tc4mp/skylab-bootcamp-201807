import { createStore } from 'redux'
import rootReducer from './reducers'

const DEFAULT_MAX_DIM = 400
const DEFAULT_FPS = 10
const DEFAULT_ISF = 0.8
const DEFAULT_OS = 16
const BREAK_SCREEN = 700

const initialState = {
    layout: true,
    user: {
        loggedIn: false
    },
    settings: {
        mainVideoSrc: '',
        ISF: DEFAULT_ISF,
        OS: DEFAULT_OS,
        FH: false,
        MAX_DIM: DEFAULT_MAX_DIM,
        FPS: DEFAULT_FPS,
        REF_RATE: 1000 / DEFAULT_FPS,
        breakScreen: BREAK_SCREEN
    }
}

const store = createStore(
    rootReducer, 
    initialState,
    window.devToolsExtension && window.devToolsExtension()
)

export default store