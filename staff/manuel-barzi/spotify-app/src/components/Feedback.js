import React from 'react'
import './Feedback.css'

function Feedback(props) {
    return <h4 className={props.positive ? "success" : "error"}>{props.message}</h4>
}

export default Feedback