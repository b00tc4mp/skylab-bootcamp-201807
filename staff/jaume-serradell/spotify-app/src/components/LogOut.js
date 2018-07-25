import React from 'react'

function LogOut({ onLogout }) {
    return <section>
        <button onClick={onLogout}>LogOut</button>
    </section>
}

export default LogOut