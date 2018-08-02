import React from 'react'

 
const BestPriceCard = props =>  { 
        const {dateFrom, cityFrom, flyFrom, dateTo, cityTo, flyTo, price, link } = props.currentFlightProp
        const {odds, results, teams, competition, date, time} = props.currentBetProp


        return(
            <section className="card">
                <div>
                
                    <span>Flights Price / Odds </span><span>{price/odds}</span>
                
      
                
            </div>     
            </section>

        )
    }
export default BestPriceCard