const SET_LAYOUT = 'SET_LAYOUT'
const UPDATE_SETTING = 'UPDATE_SETTING'
const SET_VIDEOS = 'SET_VIDEOS'
const SET_DATASETS = 'SET_DATASETS'
const SET_VIDEO = 'SET_VIDEO'

const setLayout = layout => ({type: SET_LAYOUT, layout})
const updateSetting = (key, value) => ({type: UPDATE_SETTING, key, value})
const setVideos = videos => ({type: SET_VIDEOS, videos})
const setDatasets = datasets => ({type: SET_DATASETS, datasets})
const setVideo = video => ({type: SET_VIDEO, video})

export {
    SET_LAYOUT,
    UPDATE_SETTING,
    SET_VIDEOS,
    SET_DATASETS,
    SET_VIDEO,
    setLayout,
    updateSetting,
    setVideos,
    setDatasets,
    setVideo
}