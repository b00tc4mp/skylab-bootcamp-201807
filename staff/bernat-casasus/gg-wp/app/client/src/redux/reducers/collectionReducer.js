import { SET_COLLECTION_DATA, SET_COLLECTION_ERROR, SET_COLLECTION_FEEDBACK, SET_COLLECTION_PENDING, RESET_COLLECTION_DATA } from '../actions/types'

export default function collectionReducer(state = {
    collectionData: [],
    collectionError: null,
    isCollectionPending: false,
    collectionFeedBack: null
}, action) {
    switch (action.type) {
        case SET_COLLECTION_DATA:
        console.log('collectiond data',state)
            return Object.assign({}, state, {
                collectionData: state.collectionData.concat(action.collectionData)
            });

            case RESET_COLLECTION_DATA:
                return Object.assign({}, state, {
                    collectionData: action.collectionData
                });

        case SET_COLLECTION_ERROR:
            return Object.assign({}, state, {
                collectionError: action.collectionError
            });

            case SET_COLLECTION_PENDING:
            return Object.assign({}, state, {
                isCollectionPending: action.isCollectionPending
            });

            case SET_COLLECTION_FEEDBACK:
            return Object.assign({}, state, {
                collectionFeedBack: action.collectionFeedBack
            });

        default:
            return state;
    }
}