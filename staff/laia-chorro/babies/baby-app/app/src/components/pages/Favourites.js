import React, { Component } from 'react'
import PreviewCard from '../cards/PreviewCard'
import logic from '../../logic'
import './Favourites.css'

class Favourites extends Component {
    state = {
        favs: [],
    }

    static getDerivedStateFromProps(props, state) {
        if (props.idFavs !== state.idFavs) return {favs: logic.getUserField('favs')}
    
        return null; // Return null to indicate no change to state.
    }
    
    componentDidMount(){
        this.setState({favs: logic.getUserField('favs')})
    }


    render() {

        const { state: { favs }, props: { onRemoveFavourite, onProductDetail } } = this

        return(
            <div className="myfavs-products-container">
                <h1 className="myfavs-products-heading">Your favourites</h1>
                <section className="flex-container">
                    {favs && favs.map((prod, index) => {
                        return(<div key={index} data-prod={prod.id}>
                            <PreviewCard 
                                state={prod.state} 
                                photo={prod.photos && prod.photos[0]}
                                price={prod.price}
                                title={prod.title}
                                idProd={prod.id}
                                isFav = {true}
                                description={prod.description}
                                removeFavourite={onRemoveFavourite}
                                getProductDetail={onProductDetail}                    
                            /> 
                        </div>)
                        })}
                </section>
            </div>
        )
    }
}

export default Favourites