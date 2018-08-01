import React from 'react'

const Profile = (props) => {
  return (
    <div className="profile">
      <div className="profile__photo-container">
        <img src="images/icono-user.png" alt="Profile picture"/>
      </div>
      <div className="profile__details">
        <div className="profile__details-flex">
          <h1 className="profile__details-name">{props.firstName} {props.lastName}</h1>
          <div>
            <a href="" className="profile__details-edit">Edit profile</a>
          </div>
        </div>
        <div className="profile__details-description">{props.description}</div>
      </div>
    </div>
  )
}

export default Profile