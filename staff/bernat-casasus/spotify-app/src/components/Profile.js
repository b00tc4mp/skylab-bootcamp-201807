import React from 'react'

const Profile = (props) => {

    return <section>
        <h4>User Name: {props.userName}</h4>
        <button onClick={props.onClickUpdate}>Update Settings</button>  
    </section>

}

export default Profile