import React from 'react'

const FavCard = props =>  { 
        const {dateFrom, cityFrom, flyFrom, dateTo, cityTo, flyTo, price, link } = props.currentFlightProp
        const {odds, results, teams, competition, date, time} = props.currentBetProp

        return(

            <div>
                <div>
                    <span className="font-weight-bold">Date From: </span>
                    <span>{dateFrom} | </span>
                    <span className="font-weight-bold">City From: </span>
                    <span>{cityFrom} | </span>


                    <span className="font-weight-bold">Date To: </span>
                    <span>{dateTo} | </span>
                    <span className="font-weight-bold">City To: </span>
                    <span>{cityTo} | </span>


                    <span className="font-weight-bold">Price: </span>
                    <span>{price}€ | </span>
                    <span><a href={link}>Go to kiwi</a></span>


                </div>  
                <div>
                
                    <span className="font-weight-bold">Odds: </span><span>{odds} | </span>
                
                
                    <span className="font-weight-bold">Results: </span><span>{results} | </span>
                    <span className="font-weight-bold">Teams: </span><span>{teams} | </span>
                    <span className="font-weight-bold">Competition: </span><span>{competition} | </span>
            
               
                    <span className="font-weight-bold">Date: </span><span>{date} | </span>
                    <span className="font-weight-bold">Time: </span><span>{time} | </span>
                    <span><a href={link}>Go to Bet</a></span>
                </div>
                   
            </div>

        )
    }

export default FavCard