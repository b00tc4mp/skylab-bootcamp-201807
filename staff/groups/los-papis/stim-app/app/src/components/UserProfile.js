import React, {Component} from 'react'
import NavBar  from "./NavBar";
import Landing from "./Landing";

class UserProfile extends Component{




    render(){
        return <section>
        <h2>Profile</h2>
        <img src={require('../imagenes/logo-steam.png')} width="100vw" height="100vh" />
        <p>Username:{}</p>
        </section>
        
    }
    
}

export default UserProfile;