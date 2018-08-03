import React from 'react'
import FavCard from '../cards/FavCard'
import logic from '../../logic'


const MyFavs = props => {

        if (logic._userFavorites[0] && logic._userFavorites[1] && logic._userFavorites[1].flight) {
            return(
                <section>
                    {logic._userFavorites.map((fav, index) => {
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