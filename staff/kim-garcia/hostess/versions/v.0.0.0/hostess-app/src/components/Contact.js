import React from 'react'

const Contact = props => {
    return (
        <li className="contact">
            <fieldset className="contact-field">
                <legend> Contact card:  </legend>
                {
                    props.name && <p className="contact__name"><span> {props.name}</span> </p>
                }
                {
                    props.phone && <p className="contact__phone"><span>Whatsapp:</span> {props.phone}</p>
                }
                {
                    props.email && <p className="contact__email"><span>Email:</span> {props.email}</p>
                }
            </fieldset>
        </li>
    )
}

export default Contact
