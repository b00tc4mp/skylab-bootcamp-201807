import React from 'react'

const Contact = props => {
    return (
        <div className="contact">
            <details>
                <summary>CONTACT</summary>
                {
                    props.name && <p className="contact__name">Name: {props.name}</p>
                }
                {
                    props.phone && <p className="contact__phone">Whatsapp: {props.phone}</p>
                }
                {
                    props.email && <p className="contact__email">Email: {props.email}</p>
                }
            </details>
        </div>
    )
}

export default Contact
