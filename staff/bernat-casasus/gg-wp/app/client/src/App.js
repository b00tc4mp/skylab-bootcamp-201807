import React, { Component } from 'react';
import './App.css';
import { Route,Redirect,withRouter, Switch } from 'react-router-dom'

import {
  Header,
  NavBar,
  Home,
  Footer,
  Login,
  Register,
  Profile,
  ShowResults,
  Error404,
  Collections
} from "./componenets/index";

import { connect } from 'react-redux';

class App extends Component {
  render() {
    // console.log(this.props)
    let { props: { isLoggedIn } } = this
    return (
      <div className="App">
        <Header />
        <NavBar />
        <div className="App-content">
          <Switch>
            <Route exact path="/" render={() => <Home />} />
            <Route path="/home" render={() => <Home />} />
            <Route path="/login" render={() =>  isLoggedIn ? <Redirect to="/home" /> : <Login />} />
            <Route path="/register" render={() => isLoggedIn ? <Redirect to="/home" /> :<Register />} />
            <Route path="/profile" render={() => !isLoggedIn ? <Redirect to="/home" /> :<Profile />} />
            <Route path="/collections" render={() => !isLoggedIn ? <Redirect to="/home" /> :<Collections />} />
            <Route path="/summoner/:summonerName" render={(props) => !isLoggedIn ? <Redirect to="/login" /> :<ShowResults summonerName={props.match.params.summonerName} />} /> 
            <Route path='/' render={props => <Error404 />} />
            
          </Switch>
        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.session.isLoggedIn
  }
}


export default withRouter(connect(mapStateToProps)(App))
// export default App
