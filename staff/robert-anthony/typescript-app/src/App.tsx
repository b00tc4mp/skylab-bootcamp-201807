import * as React from 'react';
import './App.css';




import './App.css';
import {Route, Redirect} from 'react-router-dom'
/*import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import SearchPage from "./components/SearchPage"
import FavouritesPage from "./components/FavouritesPage"
import UserPage from "./components/UserPage"
import UserRegister from './components/UserRegister';
import UserLogin from './components/UserLogin';
import logic from './logic'*/

class App extends React.Component {

    public onLogin = (username:string, password:string, alert:Function) => {
        // logic.loginUser(username, password)
        //     .then(() => {
        //         alert()
        //         this.setState({loggedIn: true, errorLogin: null})})
        //     .catch(({message}) => this.setState({errorLogin: message}))
    }

    public onLogout = event:Event => {
        // logic.logout()
        // this.setState({loggedIn: false})
    }


  public render() {

    // const {state :{loggedIn}, onLogout }= this

    return(
        <div>
    {/*        <NavBar isLoggedIn={loggedIn}  onLogout={onLogout}/>
            <Route exact path="/" component={HomePage}/>
            <Route  path="/home" component={HomePage} />
            <Route  path="/search" render = {() => loggedIn ? <SearchPage/> : <Redirect to="/home" /> } />
            <Route  path="/user" render={() => loggedIn ? <UserPage/> : <Redirect to="/home" /> } />
            <Route  path="/register" render={() => loggedIn ? <Redirect to="/home" /> : <UserRegister/>} />
            <Route  path="/favourites" render={() => loggedIn ?  <FavouritesPage/> : <Redirect to="/user" /> } />
            <Route  path="/login" render={() => loggedIn ? <Redirect to="/home" /> : <UserLogin errorLogin={this.state.errorLogin} onLogin={this.onLogin}/>} />


*/}

        </div>)
  }
}

export default App;




