import React from 'react'
import './css/admin.css'

function Admin(props) {
    return <section className="admin">
                <button className="admin__button" onClick={() => props.clickLogOut()} >Log Out</button>
                <button className="admin__button" onClick={() => props.clickUpdate()} >Update User</button>
                <button className="admin__button" onClick={() => props.clickDelete()} >Delete User</button>
           </section>
}

export default Admin