import React, {Component} from 'react'
import logic from '../logic'
import close from '../images/close.svg'

class FavoriteList extends Component {

    state = { favorites: logic._userFavorites }

    printFavorites = () => {
        return this.state.favorites.map((ingredient) => {
            return  <li>{ingredient}
                        <a href="" onClick={(event) => {event.preventDefault(); this.onRefresh(ingredient)}}>
                            <img src={close}/>
                        </a>
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
        return  <section>
                    <h2>Your Favorite List</h2>
                    <ul>{this.printFavorites()}</ul>
                </section>
    }
}

export default FavoriteList