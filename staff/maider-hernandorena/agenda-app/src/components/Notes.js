import React, { Component } from 'react'
import logic from '../logic'

class Notes extends Component {

    state = {
        notes: [],
        title: '',
        note: '', 
        error: ''
    }

    keepTitle = e => this.setState({ title: e.target.value })
    keepNote = e => this.setState({ note: e.target.value })

    componentDidMount() {
        this.listNotes()
    }

    listNotes = () => {
        const { username, token } = this.props
        logic.listNotes(username, token)
            .then(notes => this.setState({ notes }))
            .catch(({ message }) => this.setState({error: message}))
    }

    addNotes = e => {
        e.preventDefault()
        const { username, token } = this.props
        const { title, note } = this.state

        logic.addNotes(username, title, note, token)
            .then(notes => this.setState(notes = [{title, note}]))
            .then(() => this.listNotes())
            .catch(({ message }) => this.setState({error: message}))
    }

    render() {
        const { state: {notes, error}, addNotes, keepTitle, keepNote } = this

        return <main>
            <div>
                <h3>Notes:</h3>
                <div className="grid-container">
                    <div>
                        <form onSubmit={addNotes}>
                            <input type="text" name="title" placeholder="title" onChange={keepTitle} />
                            <textarea type="text" name="note" placeholder="type here..." onChange={keepNote} />
                            <button type="submit">Add Note</button>
                        </form>
                        {error && <p className="error">{error}</p>}
                    </div>
                    <ul>
                        {notes.map(notes => <li key={notes.title}>
                            <h4>{notes.title}</h4>
                            <p>{notes.note}</p>
                        </li> )}
                    </ul>
                </div>
            </div>
        </main>
    }
}

export default Notes