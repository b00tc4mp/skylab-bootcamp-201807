import React, { Component } from 'react'
import logic from '../logic'

class Notes extends Component {

    state = {
        notes: [],
        title: '',
        note: '', 
        error: ''
    }

    keepTitle = e => this.setState({ title: e.target.value, error: '' })
    keepNote = e => this.setState({ note: e.target.value, error: '' })

    componentWillMount() {
        this.listNotes()
    }

    listNotes = () => {
        const { username, token } = this.props
        logic.listNotes(username, token)
            .then(notes => this.setState({ notes, title: '', note: '' }))
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

    deleteNote = (e, {title, note}) => {
        e.preventDefault()
        const { username, token } = this.props
        
        logic.deleteNote(username, title, note, token)
            .then(() => true)
            .then(() => this.listNotes())
            .catch(({ message }) => this.setState({error: message}))
    }

    render() {
        const { state: {notes, error}, addNotes, keepTitle, keepNote, deleteNote } = this

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
                        {notes.map(note => <li key={note.title}>
                            <a href="" onClick={e => deleteNote(e, note)} >X</a>
                            <h4>{note.title}</h4>
                            <p>{note.note}</p>
                        </li> )}
                    </ul>
                </div>
            </div>
        </main>
    }
}

export default Notes