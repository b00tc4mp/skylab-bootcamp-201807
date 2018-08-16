import React from 'react'

function IfWrong(props) {
    return  <section className="error">
                <h3>{props.message}</h3>
            </section>
}

export default IfWrong