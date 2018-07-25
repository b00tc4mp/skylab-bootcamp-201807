import React, {Component} from 'react'
import IfWrong from './IfWrong'
import './css/search.css'

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
        return <section className="search-bar">
                    <form className="search-bar__form" onSubmit={this.onSearch}>
                        <input className="search-bar__form__space" type="text" onChange={this.keepQuery} placeholder="Type to search..."/>
                        <button className="search-bar__form__button" type="submit">Search</button>
                    </form>
                    {this.props.error && <IfWrong message={this.props.error} />}
                </section>
    }
}

export default SearchPanel