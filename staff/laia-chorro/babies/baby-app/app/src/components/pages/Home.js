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

    componentDidMount(){
        this.getIdFavs()
        this.getProducts()
    }

    getIdFavs = () => {
        const favs = logic.getUserField('favs')

        if (logic.loggedIn && favs && favs.length) {
            const idFavs = favs.map(fav => fav.id);
            this.setState({ idFavs })
        }
    }

    getProducts = () => {
        return Promise.resolve()
            .then(() => logic.getSimpleProductsByFilters())
            .then(products => this.setState({ products }) )
            .catch(res => {
            })
            //.catch(({ message }) => this.setState({ errorMsg: message }))
    }

    // TODO: redirect to loggin if user is not logged
    addProductToFavourites = (idProduct) => {
        this.getIdFavs()
        return Promise.resolve()
            .then(() => logic.addProductToFavourites(idProduct))
            .then(() => logic.getPrivateUser() )
            .then(() => this.getIdFavs() )
            .catch(res => {
            })
            //.catch(({ message }) => this.setState({ errorMsg: message }))
    }


    render() {

        const { products, idFavs } = this.state

       return(
            <main >
                    <div className="filter-container" >
                        <FilterCard />
                    </div>
                    <section className="flex-container">
                        {products.map((prod, index) => {
                            return(<div key={index} data-prod={prod.id}>
                                <PreviewCard 
                                    state={prod.state} 
                                    photo={prod.photos[0]}
                                    price={prod.price}
                                    title={prod.title}
                                    idProd={prod.id}
                                    isFav = {idFavs && idFavs.length && idFavs.includes(prod.id)}
                                    description={prod.description}
                                    addProductToFavourites={this.addProductToFavourites}                     
                                /> 
                            </div>)
                            })}
                    </section>
                <Footer />
            </main>
        )
    }

}

// <h1 className="text-white pt-4 heading-home">HOME</h1>


export default Home