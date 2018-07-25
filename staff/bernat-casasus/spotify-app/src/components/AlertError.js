import React from 'react'

const AlertError = (props) => {

    var h2Style = {
        color: 'red'
      };
    return <section>
        <h2 style={h2Style}>{props.Alert}</h2>
    </section>
}

export default AlertError