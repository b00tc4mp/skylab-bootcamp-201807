import React, { Component } from 'react'

class SearchPanel extends Component {
    keepQuery = (event) => {
        let query = event.target.value
        this.setState({query})
    }
    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSearch(this.state.query)
    }
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input type="text" onChange={this.keepQuery}/>
                <button type="submit">Search</button>
            </form>
        );
    }
}

export default SearchPanel