import React, {Component} from 'react'
import './styles/Landing.css'
import CarrouselLanding from './CarrouselLanding'

class Landing extends Component {
    render() {
       
        return(
            <div>
                <div className='landing__buttons'>
                    <a href='/#/user/register' className="button">REGISTER</a><br/>
                    <a href='/#/user/authenticate' className="button">LOGIN</a>
                </div>
            </div>
        )
    }
}

export default Landing