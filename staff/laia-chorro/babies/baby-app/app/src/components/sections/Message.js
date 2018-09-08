import React from 'react'
import './Message.css'

const Message = (props) => {

    return(
        <h3 className={props.success? "successful" : "error"}>{props.text}</h3>
    )
}

export default Message

