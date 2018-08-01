import React from 'react'

const Profile = (props) => {

    return <section>
        <img src="https://vignette.wikia.nocookie.net/nyancat/images/0/0b/Wtf.gif/revision/latest?cb=20130812121828" />
        <h4>User Name: {props.userName}</h4>
        <button onClick={props.onClickUpdate}>Update Settings</button>  
    </section>

}

export default Profile