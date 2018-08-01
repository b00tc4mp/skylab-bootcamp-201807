import React, {Component} from 'react'
import Feedback from './Feedback'

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
                {this.props.feedback && <Feedback message = {this.props.feedback} />}
                {/* {this.props.feedback && swal(`Fatal Error: ${this.props.feedback}`)} */}
            </section>
    }
}

export default Search
