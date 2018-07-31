import React, {Component} from 'react'

class Search extends Component{

    state = {
        query: ''
    }

    saveQuery = (event) => {

        this.setState ({query: event.target.value})

    }

    searchIngredients = (event) => {

        event.preventDefault()
        this.props.onSearch(this.state.query)
    }

    render(){

        return <section>
                <form onSubmit = {this.searchIngredients}>
                <input type="text" placeholder="Type here..."  onChange = {this.saveQuery} >
                </input>
                <button type="submit" > Search
                </button>
                </form>
            </section>
    }
}

export default Search
