import React from 'react'
import '../sass/feedback.css'

function showFeedback (props){
    return  <section>
                <h4 className="message">{props.message}</h4>
            </section>
}

export default showFeedback