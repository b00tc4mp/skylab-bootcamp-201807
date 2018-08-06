import React from 'react'

function Profile ({onUpdate, onDelete}){
    return  <section> 
                <button onClick={onUpdate}>Update</button>
                <button onClick={onDelete}>Delete</button>
            </section>
}

export default Profile