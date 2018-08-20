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

    addNotes = e => {
        e.preventDefault()
        const { username, token } = this.props
        const { title, note } = this.state

        logic.addNotes(username, title, note, token)
            .then(notes => notes = [{title, note}])
            .catch(({ message }) => this.setState({error: message}))
    }

    render() {
        const { state: {notes, title, note, error}, addNotes, keepTitle, keepNote } = this

        return <main>
            <div>
                <h3>Notes:</h3>
                <form onSubmit={addNotes}>
                    <input type="text" name="title" placeholder="title" onChange={keepTitle} />
                    <input type="text" name="note" placeholder="note" onChange={keepNote} />
                    <button type="submit">Add Notes</button>
                </form>
                {error && <p className="error">{error}</p>}
                <ul>
                    {notes.map(notes => <li>
                        <h4>{title}</h4>
                        <p>{note}</p>
                    </li> )}
                </ul>
            </div>
        </main>
    }
}

export default Notes