import React, {Component} from 'react'
import {Link} from 'react-router-dom';

class MyFavs extends Component {
    
    componentDidMount() {
        this.callapi();
      }

    callapi (){
        
    } 

    
    render () {

        return(
            <section>
        <h1>Helooooooooooooooo</h1>
        <Link to="/">Home</Link>

        </section>
        )
    }

}


export default MyFavs;