import React, { Component } from 'react'
import PreEditCard from '../cards/PreEditCard'
import logic from '../../logic'
import './Mylist.css'
import Alert from 'react-s-alert'
import Loader from 'react-loader'
//import background from '../../assets/playing-baby.svg'


class Mylist extends Component {

    state = {
        products: logic.getUserField('products') || [],
        loaded: true
    }
    
    componentDidMount(){
        this.setState({products: logic.getUserField('products')})
    }

    onProductUpdateState = (idProd, state) => {
        this.setState({ loaded: false })

        logic.updateStateProd(idProd, state)
            .then(() => logic.getPrivateUser() )
            .then(() => this.setState({products: logic.getUserField('products')}))
            .catch(({ message }) => Alert.error(message, { position: 'bottom-right', effect: 'slide', timeout: 3000 }) )
            .finally(() => this.setState({ loaded: true }))
      }


    render() {

        const { state: {products, loaded}, onProductUpdateState, props: {onProductDetail} } = this
        
        return (
            <div className="mylist-products-container">
                <Loader loaded={loaded}>
                    <section className="flex-container">
                        <h1 className="mylist-products-heading">Your products</h1>
                        {products && products.map((prod, index) => {
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
                                    getProductDetail={onProductDetail}
                                />
                            </div>)
                            })}
                    </section>
                </Loader>
            </div>

        )
    }
}

export default Mylist