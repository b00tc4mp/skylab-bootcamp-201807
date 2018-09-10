import React from 'react'

const Contact = props => {
    return (
        <div className="contact">
            <details>
                <summary>CONTACT</summary>
                <p className="contact__name">Contact name: {props.name}</p>
                <p className="contact__phone">Whatsapp: {props.phone}</p>
                <p className="contact__email">Email: {props.email}</p>
            </details>
        </div>
    )
}

export default Contact
