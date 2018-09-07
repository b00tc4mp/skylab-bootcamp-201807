import React, {Component} from 'react'


import './styles/Landing.css'

class Landing extends Component {
    render() {
       
        return(
            <div className='landing'>
                <h1 className='landing__title'> Welcome to Crypto App </h1>
                <div className='landing__buttons'>
                    <a href='/#/user/register' className="button">REGISTER</a><br/>
                    <a href='/#/user/authenticate' className="button">LOGIN</a>
                    
                </div>
            </div>
        )
    }
}

export default Landing