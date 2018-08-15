// Dependencies
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Components
import App from './components/App';
import Login from './components/Login';
import Register from './components/Register';
import Files from './components/Files';

const AppRoutes = () =>
    <App>
        <Switch>
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
            <Route path='/files' component={Files} />
        </Switch>   
    </App>

export default AppRoutes;