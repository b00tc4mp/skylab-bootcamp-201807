import React from 'react'

function Logout (props){
 return <section>
    <button onClick = {props.favoritesList} > Favorites
        </button>
        <button onClick = {props.profileOption} > Profile
        </button>
        <button onClick = {props.logoutExit} > Logout
        </button>
      </section>
    }

export default Logout


