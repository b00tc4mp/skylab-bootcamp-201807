import React, { Component } from 'react'

import './ListLike.css'

import logic from '../logic'

class ListLike extends Component {

    toggleHeart = id => {
        logic.toggleTrackFavorite(id)
            .then(() => {
                this.forceUpdate()
                this.props.onLike()
            })
            .catch(({ message }) => this.setState({ error: message }))
    }

    isLike = id => logic.isFavorite(id) ? "fas" : "far"

    render() {
        const { toggleHeart, isLike } = this
        const { items, onClick } = this.props
        return (
            <ul className="list-like" >
                {items.map(({ id, name }) => {
                    return (
                        <li className="list-like__item" key={id}>
                            <a onClick={() => onClick(id)} href={`#${id}`} >{name}</a>
                            <i onClick={() => toggleHeart(id)} className={`fa-heart ${isLike(id)}`}></i>
                        </li>
                    )
                })}
            </ul >
        )
    }
}

export default ListLike