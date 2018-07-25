import React from 'react'
import UpdatePanel from './UpdatePanel';

function Admin(props) {
    return <section>
                <button onClick={() => props.clickLogOut()} >Log Out</button>
                <button onClick={() => props.clickUpdate()} >Update User</button>
                <button onClick={() => props.clickDelete()} >Delete User</button>
           </section>
}

export default Admin