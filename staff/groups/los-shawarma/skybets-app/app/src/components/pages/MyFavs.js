import React from 'react'
import FavCard from '../cards/FavCard'

const MyFavs = props => {

        if (props && props.favsProp && props.favsProp[0] && props.favsProp[0].flight) {
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
        } else {
            return(
                <div>
                    <span>Your favourites list is empty</span>
                </div>
            )
        }
           
    
    
}
    




export default MyFavs;