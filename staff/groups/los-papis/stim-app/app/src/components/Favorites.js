import React, { Component } from "react"
import logic from "../logic"
import FavCard from '../components/FavCard'
import { CardColumns } from "reactstrap"

class Favorites extends Component {
  state = {
    favoriteList: logic._userFavorites,

  }


  deleteFavorites = (id) => {
    logic.toggleGameFavorite(id)
    .then(() => {
        this.setState({
            favoriteList: logic._userFavorites
        })
    })
  }


  render() {
   return <CardColumns className="mt-4 p-2">
        {!this.state.favoriteList.length && <h2>You have no favorites yet!</h2> }
        {this.state.favoriteList.map(e => {
          return <FavCard deleteFavorites={this.deleteFavorites} id={e} key={e} />
        })}
      </CardColumns>
  }
}

export default Favorites
