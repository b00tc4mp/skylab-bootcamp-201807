import React from 'react'
import FavCard from '../cards/FavCard'

const MyFavs = props => {
   
           return(
            <section>
                {props.favsProp.map((fav, index) => {
                    return(<div key={index}>
                        <FavCard 
                            currentPriceProp={fav.flight.price} 
                            currentOddsProp={fav.bet.odds}
                            currentFlightProp={fav.flight}
                            currentBetProp={fav.bet}                        
                        /> 
                    </div>)
                    })}
            </section>
        )
    
    
}
    




export default MyFavs;