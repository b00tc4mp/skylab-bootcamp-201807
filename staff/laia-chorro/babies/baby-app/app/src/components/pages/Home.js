import React, {Component} from 'react'
import PreviewCard from '../cards/PreviewCard'
import FilterCard from '../cards/FilterCard'
import Footer from '../sections/Footer'
import logic from '../../logic'
import './Home.css';

class Home extends Component {

    state = {
        products: [],
        idFavs: []

    }

    static getDerivedStateFromProps(props, state) {
        if (props.idFavs !== state.idFavs) return {idFavs: props.idFavs}
    
        return null; // Return null to indicate no change to state.
    }

    componentDidMount() {
        this.props.getIdFavs()
        this.getProducts()
    }

    getProducts = (query) => {
        return Promise.resolve()
            .then(() => logic.getSimpleProductsByFilters(query))
            .then(products => this.setState({ products: products || [] }) )
            //.catch(({ message }) => this.setState({ errorMsg: message }))
    }


    render() {

        const { state: { products, idFavs }, props: { onAddFavourite, onRemoveFavourite, onProductDetail } } = this

       return(
            <main >
                    <div className="filter-container" >
                        <FilterCard filterProducts={this.getProducts}/>
                    </div>
                    <section className="flex-container">
                        {products.length ? 
                            products.map((prod, index) => {
                                return(<div key={index} data-prod={prod.id}>
                                    <PreviewCard 
                                        state={prod.state} 
                                        photo={prod.photos[0]}
                                        price={prod.price}
                                        title={prod.title}
                                        idProd={prod.id}
                                        isFav = {idFavs && idFavs.length && idFavs.includes(prod.id)}
                                        description={prod.description}
                                        addFavourite={onAddFavourite}
                                        removeFavourite={onRemoveFavourite}
                                        getProductDetail={onProductDetail}             
                                    /> 
                                </div>)
                            }) :
                            <div className="home-empty-products">
                                <h1>We could'nt find any product that fits your requirements</h1>
                            </div>
                        }
                    </section>
                <Footer />
            </main>
        )
    }
}

export default Home