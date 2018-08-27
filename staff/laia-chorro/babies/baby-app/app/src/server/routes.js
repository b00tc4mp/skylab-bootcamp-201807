import Home from '../components/pages/Home'
import Login from '../components/pages/Login'
import Register from '../components/pages/Register'
import Update from '../components/pages/Update'

//import { fetchExample } from './api'

const routes =  [
  {
    path: '/',
    exact: true,
    component: Home,
    //fetchInitialData: (path = '') => fetchExample()
  },
  {
    path: '/login',
    //exact: true,
    component: Login,
  },
  {
    path: '/register',
    //exact: true,
    component: Register,
  },
  {
    path: '/update',
    //exact: true,
    component: Update,
  },
]

export default routes


/*
        <Switch>
            <Route path="/" exact render={() => <Home onUpdateFavsProp={onUpdateFavs}/>} />
            <Route path="/login" exact render={() => <Login onLoginProp={onLogin} errorMsg={errorMsg} showFeedback={showFeedback} hideFeedback={hideFeedback}/>} />
            <Route path="/register" exact render={() => <Register onRegisterProp={onRegister} errorMsg={errorMsg} showFeedback={showFeedback} hideFeedback={hideFeedback}/>} />
            <Route path="/update" exact render={() => loggedIn ? <Update onUpdateProp={onUpdate} username={logic.userUsername} errorMsg={errorMsg} showFeedback={showFeedback} hideFeedback={hideFeedback}/> : <Redirect to="/login" />} />
        </Switch>
*/