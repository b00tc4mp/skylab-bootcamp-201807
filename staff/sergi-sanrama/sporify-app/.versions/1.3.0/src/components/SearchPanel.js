import React, { Component } from 'react'

class SearchPanel extends Component {

    keepQuery = event =>{
        var query = event.target.value
        this.setState({ query })
    }// cada vez que hay un cambio en el input, llamamos al keepQuery, y este actualiza el estado, y selecciona solo el texto con event.target.value
    

    onSearch = event => {
        event.preventDefault()
        this.props.onSearch(this.state.query);
    }// capturamos el click al boton search

    render(){
        return <form onSubmit={this.onSearch}> 
            <input type="text" onChange={this.keepQuery} /> 
            <button type="submit">Search</button>
        </form>
    }
}

export default SearchPanel