import React, {Component} from 'react'

import './Landing.css'

class Landing extends Component {
    render() {
        const {
            props: {
                onRegister,
                onLogin
            }
        } = this
        return(
            <div className="landing">
                <h1 className="landing__title"> SpotiJuan </h1>
                <div className="landing__buttons">
                    <button onClick={onRegister} className="landing__btn landing__btn--register"> Register </button>
                    <button onClick={onLogin} className="landing__btn landing__btn--login"> Login </button>
                </div>
            </div>
        )
    }
}

export default Landing