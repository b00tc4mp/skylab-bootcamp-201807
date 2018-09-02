const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const SET_LAYOUT = 'SET_LAYOUT'
const UPDATE_SETTING = 'UPDATE_SETTING'

const login = () => ({ type: LOGIN })
const logout = () => ({ type: LOGOUT })
const setLayout = layout => ({type: SET_LAYOUT, layout})
const updateSetting = (key, value) => ({type: UPDATE_SETTING, key, value})

export {
    LOGIN,
    LOGOUT,
    SET_LAYOUT,
    UPDATE_SETTING,
    login,
    logout,
    setLayout,
    updateSetting
}