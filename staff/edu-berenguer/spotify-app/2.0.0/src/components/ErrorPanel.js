import React from 'react'
import './ErrorPanel.css'

function ErrorPanel(props) {
    return <h4 className="error">{props.message}</h4>
}

export default ErrorPanel