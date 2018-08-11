import React from 'react'
import './css/ifWrong.css'
import icon from '../alert.png'

function IfWrong(props) {
    return  <section className="error">
                <img src={icon} className="error__icon" />
                <h3 className="error__text">{props.message}</h3>
            </section>
}

export default IfWrong