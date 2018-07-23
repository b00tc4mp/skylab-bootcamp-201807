import React, {Component} from 'react'

class SearchPanel extends Component{

    state={
        query: ''
    }

    keepQuery = event => {
        var query = event.target.value

        this.setState(
            {query}
        )
    }

    onSearch2 = event =>{
        event.preventDefault()
        this.props.onSearch3(this.state.query);

    }

    render(){
        return (
            <form onSubmit={this.onSearch2}>
                <input type="text" onChange={this.keepQuery} />
                <button type="submit">Search</button>
            </form>
        )
    }
}

export default SearchPanel
