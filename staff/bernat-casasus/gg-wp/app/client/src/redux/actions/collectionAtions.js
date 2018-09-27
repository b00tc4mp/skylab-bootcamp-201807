import { SET_COLLECTION_DATA, SET_COLLECTION_ERROR, SET_COLLECTION_FEEDBACK, SET_COLLECTION_PENDING, RESET_COLLECTION_DATA } from '../actions/types'
import logic from '../../logic'

export const collection = (action, summonerId) => {
    return dispatch => {
        // dispatch(setCollectionPending(true))
        if (action === 'set') {
            debugger
            dispatch(resetCollectionData([]))
            return logic.listFollows()
                .then(res => {
                    return res.map((id) => {
                        return logic.getSummaryPreviewBySummonerId(id)
                            .then(res => dispatch(setCollectionData(res)))
                            .catch(error => {
                                debugger
                                dispatch(setCollectionData({}))
                                dispatch(setCollectionError(error.message))
                                setTimeout(() => {
                                    dispatch(setCollectionError(null))
                                }, 6000)
                                // dispatch(setCollectionPending(false))
                            })
                    })
                    // dispatch(setCollectionPending(false))

                })

                .catch(error => {
                    debugger
                    dispatch(setCollectionData({}))
                    dispatch(setCollectionError(error.message))
                    setTimeout(() => {
                        dispatch(setCollectionError(null))
                    }, 6000)
                    // dispatch(setCollectionPending(false))
                })
        } else if (action === 'add') {
            return logic.followPlayer(summonerId)
                .then(res => {
                    dispatch(setCollectionFeedBack('The summoner is now in your collection!'))
                    setTimeout(() => {
                        dispatch(setCollectionFeedBack(null))
                    }, 6000)
                    // dispatch(setCollectionPending(false))
                })
                .catch(error => {
                    dispatch(setCollectionData({}))
                    dispatch(setCollectionError(error.message))
                    setTimeout(() => {
                        dispatch(setCollectionError(null))
                    }, 6000)
                    // dispatch(setCollectionPending(false))
                })
        } else if (action === 'rm') {
            dispatch(resetCollectionData([]))
            return logic.unFollowPlayer(summonerId)
                .then(res => {
                    dispatch(setCollectionFeedBack('Unfollow summoner succed!'))
                    setTimeout(() => {
                        dispatch(setCollectionFeedBack(null))
                    }, 6000)
                    return logic.listFollows()
                        .then(res => {
                            return res.map((id) => {
                                return logic.getSummaryPreviewBySummonerId(id)
                                    .then(res => dispatch(setCollectionData(res)))
                            })
                            // dispatch(setCollectionPending(false))

                        })
                    // dispatch(setCollectionPending(false))
                })
                .catch(error => {
                    dispatch(setCollectionError(error.message))
                    setTimeout(() => {
                        dispatch(setCollectionError(null))
                    }, 6000)
                    // dispatch(setCollectionPending(false))
                })

        }
    }
}

function setCollectionData(collectionData) {
    return {
        type: SET_COLLECTION_DATA,
        collectionData
    };
}

function resetCollectionData(collectionData) {
    return {
        type: RESET_COLLECTION_DATA,
        collectionData
    }
}

function setCollectionError(collectionError) {
    return {
        type: SET_COLLECTION_ERROR,
        collectionError
    };
}

function setCollectionPending(isCollectionPending) {
    return {
        type: SET_COLLECTION_PENDING,
        isCollectionPending
    }
}

function setCollectionFeedBack(collectionFeedBack) {
    return {
        type: SET_COLLECTION_FEEDBACK,
        collectionFeedBack
    };
}



