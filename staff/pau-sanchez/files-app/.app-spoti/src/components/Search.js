import React, { Component } from 'react'
import Feedback from './Feedback'

class Search extends Component {
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
        return <section>
            <form onSubmit={this.onSearch}>
                <input type="text" onChange={this.keepQuery} />
                <button type="submit">Search</button>
            </form>
            {this.props.error && <Feedback error={this.props.error} />}
        </section>
    }
}

export default Search
