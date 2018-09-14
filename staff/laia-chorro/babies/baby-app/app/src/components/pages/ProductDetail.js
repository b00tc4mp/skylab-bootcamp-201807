import React, { Component } from 'react'
import ProductDetailCard from '../cards/ProductDetailCard'
import './ProductDetail.css'
import { withRouter } from 'react-router-dom'
import Loader from 'react-loader'

class ProductDetail extends Component {
    state = {
        product: null,
        idFavs: [],
        loaded: false
    }

    static getDerivedStateFromProps(props, state) {
        if (props.product !== state.product) return { product: props.product }

        if (props.idFavs !== state.idFavs) return {idFavs: props.idFavs}
    
        return null; // Return null to indicate no change to state.
    }

    componentDidMount () {
        const { idProd } = this.props.match.params
        
        this.props.onProductDetail(idProd)
        this.props.getIdFavs()
    }


    render() {

        const { props: { onProductDetail, onAddFavourite, onRemoveFavourite, loaded, onGoToChat }, state: { product, idFavs } } = this

        return(
            <main>
                <Loader loaded={loaded}>
                    {product ?
                        <div>
                            <ProductDetailCard 
                                onProductDetail={onProductDetail}
                                isFav = {idFavs && idFavs.length && idFavs.includes(product.id)}
                                addFavourite={onAddFavourite}
                                removeFavourite={onRemoveFavourite}
                                category = {product.cathegory}
                                createdAt = {product.created_at}
                                description = {product.description}
                                idProd = {product.id}
                                latitude = {product.location[1]}
                                longitude = {product.location[0]}
                                numFavs = {product.num_favs}
                                numViews = {product.num_views}
                                photos = {product.photos}
                                price = {product.price}
                                state = {product.state}
                                title = {product.title}
                                updatedAt = {product.updated_at}
                                userName = {product.user_name || ''}
                                userAvgScore = {product.user_avg_score}
                                userProducts = {product.user_products}
                                userReviews = {product.user_reviews}
                                userPhoto = {product.user_photo}
                                userId = {product.user_id}
                                goToChat={onGoToChat}
                                />
                        </div> :

                        <div className="prodDetail-empty-product">
                            <h1>Something went wrong, we couldn't find this product</h1>
                        </div>
                    }
                </Loader>
            </main>
        )
    }
}

export default  withRouter(ProductDetail)