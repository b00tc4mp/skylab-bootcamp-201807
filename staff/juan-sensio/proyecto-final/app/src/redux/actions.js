const SET_LAYOUT = 'SET_LAYOUT'
const UPDATE_SETTING = 'UPDATE_SETTING'
const SET_VIDEOS = 'SET_VIDEOS'
const SET_DATASETS = 'SET_DATASETS'
const SET_RESULTS = 'SET_RESULTS'
const SET_MODELS = 'SET_MODELS'
const SET_VIDEO = 'SET_VIDEO'
const SET_ACTIONS = 'SET_ACTIONS'

const setLayout = layout => ({type: SET_LAYOUT, layout})
const updateSetting = (key, value) => ({type: UPDATE_SETTING, key, value})
const setVideos = videos => ({type: SET_VIDEOS, videos})
const setDatasets = datasets => ({type: SET_DATASETS, datasets})
const setResults = results => ({type: SET_RESULTS, results})
const setModels = models => ({type: SET_MODELS, models})
const setVideo = (video, _type) => ({type: SET_VIDEO, video, _type})
const setActions = actions => ({type: SET_ACTIONS, actions})


export {
    SET_LAYOUT,
    UPDATE_SETTING,
    SET_VIDEOS,
    SET_DATASETS,
    SET_RESULTS,
    SET_MODELS,
    SET_VIDEO,
    SET_ACTIONS,
    setLayout,
    updateSetting,
    setVideos,
    setDatasets,
    setModels, 
    setResults,
    setVideo,
    setActions
}