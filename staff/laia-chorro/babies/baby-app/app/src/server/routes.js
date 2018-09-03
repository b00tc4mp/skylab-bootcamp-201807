import Home from '../components/pages/Home'
import Login from '../components/pages/Login'
import Register from '../components/pages/Register'


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
  
]

export default routes
