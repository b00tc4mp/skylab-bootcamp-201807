import React, { Component } from 'react'
import logic from '../logic'

class Agenda extends Component {

    state = { 
        notes: [],
        query: '',
        error: ''
    }
    
    keepQuery = e => this.setState({ query: e.target.value })

    onSearch = e => {
        e.preventDefault()
        const { username, token } = this.props
        logic.listNotes(username, token)
            .then(notes => {
                if(this.state.query === notes[0].title) this.setState({ notes, error: '' })
                else throw new Error(`cannot found any note with ${this.state.query}`)
            })
            .then(() => this.state.notes)
            .catch(({message}) => this.setState({ error: message }))
    }

    render() {
        const { state: {error}, keepQuery, onSearch} = this

        return <main>
            <div>
                <div className="search">
                    <p>Search your notes and/or contacts:</p>
                    <form onSubmit={onSearch}>
                        <input type="text" name="query" placeholder="type here..." onChange={keepQuery}/>
                        <button type="submit">Search</button>
                        {error && <p className="error">{error}</p>}
                    </form>
                </div>
            </div>
        </main>
    }
}

export default Agenda