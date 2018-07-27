import React, { Component } from 'react'

import './Search.css'

import List from './List'

class Search extends Component {
    state = {
        query: null,
        error: null
    }
    keepQuery = event => this.setState({query: event.target.value})
    onSubmit = event => {
        event.preventDefault();
        this.props.search(this.state.query)
            .catch(err => this.setState({error: err.message}))
    }
    render() {
        const {
            state: {
                error
            },
            props: {
                items,
                onClick
            },
            keepQuery,
            onSubmit
        } = this
        return (
            <div className="search">
                <form className="search__form" onSubmit={onSubmit}>
                    <input className="search__input" type="text" onChange={keepQuery} placeholder=" Search artists"/>
                    <button className="search__btn" type="submit">Search</button>
                    {error && <p className="search__text--error">{error}</p>}
                    <List items={items} onClick={onClick} />
                </form>
            </div>
        )
    }
}

export default Search