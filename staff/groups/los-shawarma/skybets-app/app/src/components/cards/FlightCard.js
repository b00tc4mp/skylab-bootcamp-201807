import React, {Component} from 'react'
import './FlightCard.css';


const FlightCard = props => { 

    const { dateFrom, cityFrom, flyFrom, dateTo, cityTo, flyTo, price, link } = props.flightsProp

    return(
            <div>
            <div className="block1">
                <div>
                    <span className="title">Date From: </span><span>{dateFrom}</span>
                </div>
                <div>
                    <span className="title">City From: </span><span>{cityFrom} ({flyFrom})</span>
                </div>
            </div>
            <div>
                <div>
                    <span>Date To: </span><span>{dateTo}</span>
                </div>
                <div>
                    <span>City To: </span><span>{cityTo} ({flyTo})</span>
                </div>
            </div>
            <div>
                <h5>Price:</h5>
                <p>{price}</p>
                <h5>Link:</h5>
                <a href={link}>Go to kiwi</a>
            </div>
            </div>
    )
}


export default FlightCard