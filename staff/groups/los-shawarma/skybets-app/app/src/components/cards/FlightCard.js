import React, {Component} from 'react'


const FlightCard = props => { 

    const { dateFrom, cityFrom, flyFrom, dateTo, cityTo, flyTo, price, link } = props.flightsProp

    return(
        <section>
            <div className="card">
                <h5>Date From:</h5>
                <p>{dateFrom}</p>
                {/* <span>Time</span><span>{props.flightsProp.dateFrom}</span> */}
                <h5>City From:</h5>
                <p>{cityFrom} ({flyFrom})</p>

            </div>
            <div>
                <h5>Date To:</h5>
                <p>{dateTo}</p>
                {/* <span>Time</span><span>{props.flightsProp.dateTo}</span> */}
                <h5>City To:</h5>
                <p>{cityTo} ({flyTo})</p>
                
            </div>
            <div>
                <h5>Price:</h5>
                <p>{price}</p>
                <h5>Link:</h5>
                <p><a href={link}>Go to kiwi</a></p>
            </div>
        </section>
    )
}


export default FlightCard