import React from 'react'

function Landing ({signup, login}){
    return  <section> 
                <button onClick={signup}>Sign up</button>
                <button onClick={login}>Login</button>
            </section>
}

export default Landing