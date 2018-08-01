import React, {Component} from 'react'
import NavBar  from "./NavBar";
import Landing from "./Landing";
import logic from "../logic"
class UserProfile extends Component{

    state={
        Username:null
    }
    componentDidMount() {
        logic.retrieveUser()
        .then(() => {
            this.setState({
                Username:logic._userUsername
            })

        })

    }


    render(){
        return <section>
        <h2>Profile</h2>
        <img src={require('../imagenes/logo-steam.png')} width="100vw" height="100vh" />
        <p>Username: {this.state.Username !==null && this.state.Username}</p>
        </section>
        
    }
    
}

export default UserProfile;