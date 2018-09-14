import React, {Component} from 'react'
import PreviewCard from '../cards/PreviewCard'
import FilterCard from '../cards/FilterCard'
import Footer from '../sections/Footer'
import logic from '../../logic'
import './Home.css'
import Loader from 'react-loader'
import Alert from 'react-s-alert';

class Home extends Component {

    state = {
        products: [],
        idFavs: [],
        loaded: true,
    }

    static getDerivedStateFromProps(props, state) {
        if (props.idFavs !== state.idFavs) return {idFavs: props.idFavs}
    
        return null; // Return null to indicate no change to state.
    }

    componentDidUpdate(prevProps) {
        if (this.props.searchVal !== prevProps.searchVal) {
            if (this.props.searchVal) {
                const query = {}
                query.txt = this.props.searchVal
    
                this.getProducts(query)
            } else {
                this.getProducts()
            }
            
        }
      }

    componentDidMount() {
        this.props.getIdFavs()
        this.getProducts()
    }

    getProducts = (query) => {
        this.setState({ loaded: false })
        
        return Promise.resolve()
            .then(() => logic.getSimpleProductsByFilters(query))
            .then(products => this.setState({ products: products || [] }) )
            .catch(({ message }) => Alert.error(message, { position: 'bottom-right', effect: 'slide', timeout: 3000 }) )
			.finally(() => this.setState({ loaded: true }))
    }


    render() {

        const { state: { products, idFavs }, props: { onAddFavourite, onRemoveFavourite, onProductDetail } } = this

       return(
            <main >
                
                    <div className="filter-container" >
                        <FilterCard filterProducts={this.getProducts}/>
                    </div>
                    <Loader loaded={this.state.loaded}>
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
                    {/* <Footer /> */}
                </Loader>
            </main>
        )
    }
}

export default Home