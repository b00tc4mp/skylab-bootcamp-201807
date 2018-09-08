import React, { Component } from 'react'
import PreviewCard from '../cards/PreviewCard'
import logic from '../../logic'
import './Favourites.css'

class Favourites extends Component {
    state = {
        favs: logic.getUserField('favs') || [],
    }
    
    componentDidMount(){
        this.setState({favs: logic.getUserField('favs')})
    }


    render() {

        const { state: {favs} } = this

        return(
            <div>
                <h1 className="text-white pt-4 heading-home">MY FAVOURITES</h1>
                <section className="flex-container">
                    {favs.map((prod, index) => {
                        return(<div key={index} data-prod={prod.id}>
                            <PreviewCard 
                                state={prod.state} 
                                photo={prod.photos[0]}
                                price={prod.price}
                                title={prod.title}
                                idProd={prod.id}
                                isFav = {true}
                                description={prod.description}
                                addProductToFavourites={this.addProductToFavourites}                     
                            /> 
                        </div>)
                        })}
                </section>
            </div>
        )
    }
}

export default Favourites