import React from 'react'
import error404 from '../images/error404.svg'
import '../sass/404.css'

function Error404() {

    return <section className="panel"> 
                <section className="panel__info">
                    <h2 className="panel__info__title">OOOPS!</h2>
                    <h3 className="panel__info__description">Something went wrong here.</h3>
                    <h4 className="panel__info__type">Error code 404</h4>
                    <p className="panel__info__text">We are working on it and we will get fixed as soon as posible.</p>
                </section>
                <img className="panel__imagen" src={error404}/>
            </section>
}

export default Error404