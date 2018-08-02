import React from 'react'

 
const FavCard = props =>  { 
        const {dateFrom, cityFrom, flyFrom, dateTo, cityTo, flyTo, price, link } = props.currentFlightProp
        const {odds, results, teams, competition, date, time} = props.currentBetProp


        return(
            <section className="card">
                <div>
                
                    <span>Odds </span><span>{odds}</span>
                
                
                    <span>Results </span><span>{results}</span>
                    <span>Teams </span><span>{teams}</span>
                    <span>Competition </span><span>{competition}</span>
            
               
                    <span>Date </span><span>{date}</span>
                    <span>Time </span><span>{time}</span>
                    <span>Link </span><span><a href={link}>Go to Bet</a></span>
                </div>
                <div>

                
                    <span>Date From:</span>
                    <span>{dateFrom}</span>
                    <span>City From:</span>
                    <span>{cityFrom}</span>
                
                
                    <span>Date To:</span>
                    <span>{dateTo}</span>
                    <span>City To:</span>
                    <span>{cityTo}</span>
                
                
                    <span>Price:</span>
                    <span>{price}</span>
                    <span>Link:</span>
                    <span><a href={link}>Go to kiwi</a></span>
                    <button>Add To Favorites</button>
                
            </div>     
            </section>

        )
    }
export default FavCard