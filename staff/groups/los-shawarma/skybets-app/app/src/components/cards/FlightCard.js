import React, {Component} from 'react'
import './FlightCard.css';

const FlightCard = props => { 

    const { dateFrom, cityFrom, flyFrom, dateTo, cityTo, flyTo, price, link } = props.flightsProp

    return(
            <div>
                <div className="block">
                    <div>
                        <span className="font-weight-bold">Date From: </span><span>{dateFrom}</span>
                    </div>
                    <div>
                        <span className="font-weight-bold">City From: </span><span>{cityFrom} ({flyFrom})</span>
                    </div>
                </div>
                <div className="block2">
                    <div>
                        <span className="font-weight-bold">Date To: </span><span>{dateTo}</span>
                    </div>
                    <div>
                        <span className="font-weight-bold">City To: </span><span>{cityTo} ({flyTo})</span>
                    </div>
                </div>
                <div className="block">
                    <div>
                        <span className="font-weight-bold">Price: </span><span>{price}€</span>
                    </div>
                </div>
                <div className="block2Btn">
                    <div>
                        <a target="_blank" href={link}>Go to kiwi</a>
                    </div>
                </div>
            </div>
    )
}


export default FlightCard