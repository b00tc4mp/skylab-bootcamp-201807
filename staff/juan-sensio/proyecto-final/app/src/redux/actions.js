// actions
    // user
const LOGIN = "LOGIN"
    // layout
const SET_LAYOUT = 'SET_LAYOUT'

// action creators
    // user
const login = loggedIn => ({ type: LOGIN, loggedIn })
    // layout
const setLayout = layout => ({type: SET_LAYOUT, layout})

// exports

export {
    // actions
        // user
    LOGIN,
        // layout
    SET_LAYOUT,
    // creators
        //user
    login,
        // layout
    setLayout
}