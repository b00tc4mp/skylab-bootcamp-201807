import React, { Component } from 'react'

class SearchPanel extends Component {
    state = { query: '' }

    keepQuery = event => {
        var query = event.target.value

        this.setState({ query })
    }

    onSearch = event => {
        event.preventDefault()
        
        this.props.onSearch(this.state.query)
    }

    render() {
        return <form onSubmit={this.onSearch}>
            <input type="text" onChange={this.keepQuery} />
            <button type="submit">Search</button>
        </form>
    }
}

export default SearchPanel