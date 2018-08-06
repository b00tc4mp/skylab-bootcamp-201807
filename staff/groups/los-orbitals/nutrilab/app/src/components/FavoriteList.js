import React, {Component} from 'react'
import logic from '../logic'
import close from '../images/close.svg'
import '../sass/favorites.css'

class FavoriteList extends Component {

    state = { favorites: logic._userFavorites }

    printFavorites = () => {
        return this.state.favorites.map((ingredient) => {
            return  <li className="favorites__list__item">
                        <a className="favorites__list__item__delete" href="" onClick={(event) => {event.preventDefault(); this.onRefresh(ingredient)}}>
                            <img src={close}/>
                        </a>
                        {ingredient}
                    </li>
            })
    }

    onRefresh = (ingredient) => {
        logic.toggleFoodFavorite(ingredient)
            .then(() => {
                this.setState({favorites: logic._userFavorites})
            })
    }

    render() {
        return  <section className="favorites">
                    <h2 className="favorites__title">Favorites list</h2>
                    <ul className="favorites__list">{this.printFavorites()}</ul>
                </section>
    }
}

export default FavoriteList