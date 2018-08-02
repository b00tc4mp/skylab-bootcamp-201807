import React, {Component} from 'react'


const FlightCard = props => { 

    return(
        <section>
            <div>
                <span>Date</span><span></span>
                <span>Time</span><span></span>
                <span>IATA</span><span></span>

            </div>
            <div>
                <span>Date</span><span></span>
                <span>Time</span><span></span>
                <span>IATA</span><span></span>
                
            </div>
            <div>
                <span>Price</span><span>{props.flightsProp.price}</span>
                <span>Link</span><span><a href={props.flightsProp.link}>Go to kiwi</a></span>
            </div>
        </section>
    )
}


export default FlightCard