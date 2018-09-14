import React from 'react'
import '../styles/css/error404.css'

function Error404() {

    return <section className="error404"> 
                <h2 className="error404__title">OOOPS!</h2>
                <h3 className="error404__description">Something went wrong here.</h3>
                <h4 className="error404__type">Error code 404</h4>
                <p className="error404__text">We are working on it and we will get fixed as soon as posible.</p>
            </section>
}

export default Error404