import React, {Component} from 'react'; // fem destructurin amb Component per a evitar extends React.component fem directament extens Component

class SearchPanel extends Component {
    state = { query: '' }

    keepQuery = event => { // se hace un bind del this del contexto de la instancia del objeto SearchPanel
        var query = event.target.value

        this.setState({ query })
    }

    onSearch = event => {
        event.preventDefault()

        this.props.onSearch(this.state.query);
    }

    render() {
        return <form onSubmit={this.onSearch}>
            <input type="text" onChange={this.keepQuery}/>
            <button type="submit">Search</button>
        </form>
    }

    // per a que no apunti el this de keepQuery al input fem que sigui una funció fletxa
}

export default SearchPanel



// 