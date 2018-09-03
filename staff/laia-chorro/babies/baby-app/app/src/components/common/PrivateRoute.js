import { Redirect, Route } from 'react-router-dom'

/*const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      fakeAuth.isAuthenticated === true
        ? <Component {...props} />
        : <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />
    )} />
  )*/



const PrivateRoute = ({ component: Component, ...rest }) => {

    var agga = props
    debugger;
    return (
    <Route {...rest} render={(props) => (
      true === true
        ? <Component {...props} />
        : <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />
    )} />
  )
}

  export default PrivateRoute