import React from 'react'

 
const FavCard = props =>  { 
 
       const {dateFrom, cityFrom, flyFrom, dateTo, cityTo, flyTo, price, link } = props.currentBetProp
        const {odds, results, teams, competition, date, time} = props.currentFlightProp

        return(
            <section>
                <div className="card">
                    <h2>Add to Favs</h2>
                </div>
            
                <div>
                    <span>Odds </span><span>{odds}</span>
                </div>
                <div>
                    <span>Results </span><span>{results}</span>
                    <span>Teams </span><span>{teams}</span>
                    <span>Competition </span><span>{competition}</span>
                </div>
               <div>
                    <span>Date </span><span>{date}</span>
                    <span>Time </span><span>{time}</span>
                    <span>Link </span><span><a href={link}>Go to Bet</a></span>
                </div>

                <div>
                    <h5>Date From:</h5>
                    <p>{dateFrom}</p>
                    <h5>City From:</h5>
                    <p>{cityFrom}</p>
                </div>
                <div>
                    <h5>Date To:</h5>
                    <p>{dateTo}</p>
                    <h5>City To:</h5>
                    <p>{cityTo}</p>
                </div>
                <div>
                    <h5>Price:</h5>
                    <p>{price}</p>
                    <h5>Link:</h5>
                    <p><a href={link}>Go to kiwi</a></p>
                    <button>Add To Favorites</button>
                </div>
                  
            </section>

        )
    }
export default FavCard