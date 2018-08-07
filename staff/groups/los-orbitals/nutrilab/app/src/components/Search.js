import React, {Component} from 'react'
import Feedback from './Feedback'
import '../sass/search.css'

class Search extends Component{

    state = { query: '' }

    saveQuery = (event) => this.setState ({query: event.target.value})

    searchIngredients = (event) => {
        event.preventDefault()
        this.props.onSearch(this.state.query)
    }

    render(){
         
        const {searchIngredients, saveQuery} = this
        return <section className="search">
                    <form onSubmit={searchIngredients}>
                        <input className="input--noborder" type="text" placeholder="Type here..." onChange={saveQuery}></input>
                        <button type="submit">Search</button>
                    </form>
                    {this.props.feedback && <Feedback message={this.props.feedback}/>}
                </section>
    }
}

export default Search
