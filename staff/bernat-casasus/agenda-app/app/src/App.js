import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Redirect, withRouter, Switch } from 'react-router-dom'
import {
  Header,
  Login,
  Footer,
  Register,
  Home,
} from "./components/index";
class App extends Component {

  state = {
    isLoggedIn: true
  }
  render() {
    const { state: { isLoggedIn } } = this
    return (
      <div className="App">
        <div className="Header">
          <Header isLoggedIn={isLoggedIn} />
        </div>
        <div className="App-content">
          <Switch>
            <Route exact path="/" render={() => isLoggedIn ? <Redirect to="/home" /> : <Login />} />
            <Route path="/login" render={() => isLoggedIn ? <Redirect to="/home" /> : <Login />} />
            <Route path="/register" render={() => isLoggedIn ? <Redirect to="/home" /> : <Register disableSearch={this.disableSearch} />} />
            <Route path="/home" render={() => !isLoggedIn ? <Redirect to="/login" /> : <Home />} />
            {/* <Route path="/results" render={() => <ShowResults enableSearch={this.enableSearch} />} />
              <Route path='/' render={props => <Error404 />} /> */}
          </Switch>

        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
