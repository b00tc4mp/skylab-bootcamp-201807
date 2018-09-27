import React from "react";

function NavBarPanel(props)  {

    return <section>
      <h1 className="App-title">Spotify App</h1>

      {props.loggedIn && <button onClick={props.onLogout} type="button">Logout</button>}
    </section>

}

export default NavBarPanel