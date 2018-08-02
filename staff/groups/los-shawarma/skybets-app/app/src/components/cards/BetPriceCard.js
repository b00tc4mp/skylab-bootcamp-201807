import React from 'react'

 
const BestPriceCard = props =>  { 
        const {dateFrom, cityFrom, flyFrom, dateTo, cityTo, flyTo, price, link } = props.currentFlightProp
        const {odds, results, teams, competition, date, time} = props.currentBetProp


        return(
            <div>
                <div>
                    <p className="pt-5">Flights Price / Odds</p>
                    <h2>{(price/odds).toFixed(2)}€</h2>
                </div>     
            </div>
        )
    }
export default BestPriceCard