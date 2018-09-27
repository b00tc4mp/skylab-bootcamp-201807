import { SET_STATE } from '../actions/types'

export default function setStateReducer(state = {}, action) {
    switch (action.type) {
        case SET_STATE:
            const newState = {}

            Object.keys(state).forEach(key => newState[key] = state[key])

            return newState
    }
    
    return state
}