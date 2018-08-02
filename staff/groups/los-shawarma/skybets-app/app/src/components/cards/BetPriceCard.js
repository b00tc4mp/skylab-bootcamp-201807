import React, {Component} from 'react'


const BetPriceCard = props => { 
    debugger;
    
    return(
        <section>
            <div className="card">
                <h2>Bet Price</h2>
                <p>{props.betPriceProp()}</p>
            </div>
        </section>
    )
}


export default BetPriceCard