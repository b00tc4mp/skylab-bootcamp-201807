import React, {Component} from 'react'
import logic from '../logic'

class FavoriteList extends Component {

    state = {
        favorites: logic._userFavorites,
    }

    printFavorites = () => {
        return this.state.favorites.map((ingredient) => {
            return <li>{ingredient}
                <a href="" onClick={(event) => {event.preventDefault(); logic.toggleFoodFavorite(ingredient)}}>X</a>
            </li>
        })
    }
    
    render() {
        return <section>
                <h2>Your Favorite List</h2>
                <ul>{this.printFavorites()}</ul>
            </section>
    }
}

export default FavoriteList