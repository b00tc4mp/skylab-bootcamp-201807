import React from 'react'
import './Feedback.css'

function Feedback(props) {
    return <h4 className={props.info ? "info" : "error"}>{props.info || props.error}</h4>
}

export default Feedback