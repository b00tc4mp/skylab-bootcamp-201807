import React, { Component } from 'react'
import PreEditCard from '../cards/PreEditCard'
import logic from '../../logic'
import './Mylist.css'

class Mylist extends Component {

    state = {
        products: logic.getUserField('products') || [],
    }
    
    componentDidMount(){
        this.setState({products: logic.getUserField('products')})
    }

    /*static getDerivedStateFromProps(props, state) {
        if (props.errorMsg !== state.errorMsg || 
            props.showFeedback !== state.showFeedback) {
          return {
            errorMsg: props.errorMsg,
            showFeedback: props.showFeedback,
          };
        }
    
        return null; // Return null to indicate no change to state.
    }*/

    onProductUpdateState = (idProd, state) => {
          logic.updateStateProd(idProd, state)
          .then(() => logic.getPrivateUser() )
          .then(() => this.setState({products: logic.getUserField('products')}))
      }


    render() {

        const { state: {products}, onProductUpdateState } = this
        
        return (
            <div className="mylist-products-container">
                <h1 className="text-white pt-4 heading-home">Mylist of products</h1>
                <section className="flex-container">
                    {products.map((prod, index) => {
                        return(<div key={index} data-prod={prod.id}>
                            <PreEditCard 
                                state={prod.state} 
                                photo={prod.photos[0]}
                                price={prod.price}
                                title={prod.title}
                                numViews={prod.num_views}
                                numFavs={prod.num_favs}
                                idProd={prod.id}
                                onProductUpdateState={onProductUpdateState}
                            />
                        </div>)
                        })}
                </section>
            </div>

        )
    }
}

export default Mylist