import React from 'react'

function LoginError({ onRegister, onLogin }) {

    var divStyle = {
        color: 'red',
      };

    return <section>
      <h2 style={divStyle}>Wrong Credentials</h2>
    </section>
}

export default LoginError