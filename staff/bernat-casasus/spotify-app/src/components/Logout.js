import React from 'react'

function Logout(props){

    return <section>
             <button onClick={props.onLogout}>Logout</button>
        </section>
}

export default Logout