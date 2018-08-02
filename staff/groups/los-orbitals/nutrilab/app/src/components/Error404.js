import React from 'react'
import error404 from '../images/error404.svg'

function Error404() {

    return <section> 
                <h2>OOOPS!</h2>
                <h3>Something went wrong here.</h3>
                <h4>Error code 404</h4>
                <p>We are working on it and we will get fixed as soon as posible.</p>
                <img src={error404}/>
            </section>
}

export default Error404