import { SET_REGISTER_PENDING, SET_REGISTER_SUCCESS, SET_REGISTER_ERROR } from '../actions/types'

export default function registerReducer(state = {
    isRegisterSuccess: false,
    isRegisterPending: false,
    registerError: null
}, action) {
    switch (action.type) {
        case SET_REGISTER_PENDING:
            return Object.assign({}, state, {
                isRegisterPending: action.isRegisterPending
            });

        case SET_REGISTER_SUCCESS:
            return Object.assign({}, state, {
                isRegisterSuccess: action.isRegisterSuccess
            });

        case SET_REGISTER_ERROR:
            return Object.assign({}, state, {
                registerError: action.registerError
            });

        default:
            return state;
    }
}























// import { SET_REGISTER_PENDING, SET_REGISTER_SUCCESS, SET_REGISTER_ERROR } from '../actions/types'

// export default function registerReducer(state = {
//     isRegisterSuccess: false,
//     isRegisterPending: false,
//     registerError: null
// }, action) {
//     let newState = state
//     switch (action.type) {
//         case SET_REGISTER_PENDING:
//             newState = Object.assign({}, state, {
//                 isRegisterPending: action.isRegisterPending
//             });
//             break

//         case SET_REGISTER_SUCCESS:
//         newState = Object.assign({}, state, {
//                 isRegisterSuccess: action.isRegisterSuccess
//             });
//             break

//         case SET_REGISTER_ERROR:

//         newState = Object.assign({}, state, {
//                 registerError: action.registerError
//             });
            
        
//     }
// console.log('reducer',newState)
//     return newState
// }