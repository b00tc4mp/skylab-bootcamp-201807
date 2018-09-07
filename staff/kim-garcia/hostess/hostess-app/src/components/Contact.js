import React from 'react'

const Contact = props => {
    return (
        <div className="contact">
            <details>
                <summary>CONTACT</summary>
                <span className="contact__phone">Whatsapp: {props.phone}</span>
                <p className="contact__email">Email: {props.email}</p>
            </details>
        </div>
    )
}

export default Contact
