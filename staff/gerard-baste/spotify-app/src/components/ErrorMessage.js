import React from 'react'
import './Feedback.css'

function Feedback(props) {
    return <h4 className="error">{props.message}</h4>
}

export default Feedback