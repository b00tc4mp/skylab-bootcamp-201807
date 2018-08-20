import React, { Component } from 'react'
import logic from '../logic'
//import NoteCard from '../cards/NoteCard'


class Contacts extends Component {
    state = { text: '', 
            date: new Date().toISOString(),
            notes: [] }

    /*componentDidMount() {
        debugger;
        this.listNotes()
            .catch(({ message }) => console.error(message))
    }*/

    listNotes() {
        const { username, token } = this.props

        return Promise.resolve()
            .then(() => logic.getNotesByDate(username, this.state.date, token))
            .then(notes => this.setState({ notes }))
    }

    onDateChanged = e => this.setState({ date: e.target.value })

    onTextCreated = e => this.setState({ text: e.target.value })
  
    onCalendarSubmit = e => {
        e.preventDefault()

          return Promise.resolve()
            .then(() => this.listNotes())
            .catch(({ message }) => console.error(message))
    }

    onCreate = e => {
        e.preventDefault()

        const { username, token } = this.props
        const { text, date } = this.state

        logic.addNote(username, text, date, token)
            .catch(({ message }) => console.error(message))
            .then(() => this.listNotes())           
    }

    onDelete = e => {
        e.preventDefault()

        const id = e.target.dataset.idcontact

        const { username, token } = this.props

        logic.removeNote(username, id, token)
            .catch(({ message }) => console.error(message))
            .then(() => this.listNotes())   
    }

    onUpdate = e => {
        e.preventDefault()

        const id = e.target.dataset.idcontact

        const { username, token } = this.props

        /*logic.updateNote(username, id, newText, token)
            .catch(({ message }) => console.error(message))
            .then(() => this.listNotes())
            */
    }

    render() {
        const {text, date, notes} = this.state

        return <main>
            <div className="screen">
                <nav>
                    &gt; <a href="/profile">profile</a> <a href="" onClick={this.props.onLogout}>logout</a> <span className="blink">_</span>
                    <img className="image" src="./default-image.png" alt="" />
                </nav>
                <form onSubmit={this.onCalendarSubmit}>
                    <input type="date" name="date" placeholder="date" autoFocus onChange={this.onDateChanged} />
                    <button type="submit">Search</button>
                </form>
                <form onSubmit={this.onCreate}>
                    <input type="text" name="text" placeholder="text" autoFocus onChange={this.onTextCreated} />
                    <button type="submit">Add new Note</button>
                </form>
                {
                    (!!notes.length) && <ul>
                        {
                            notes.map(note =>{
                                debugger;
                                return (<div key={note._id}>
                                    <div>
                                        <span>{note.date}</span>
                                    </div>
                                    <div>
                                        <p>{note.text}</p>
                                    </div>
                                    <div>
                                        <button data-idcontact={note._id} onClick={this.onDelete}>[x]</button>
                                        <button data-idcontact={note._id} onClick={this.onUpdate}>Edit</button>
                                    </div>
                                </div>)
                            }

                                /*<div key={note._id}>
                                    <NoteCard
                                        text={note.text} 
                                        date={note.date}                    
                                    /> 
                                </div>*/
                                /*<li>
                                    <a href="" data-file={file}>{file}</a> <a href="" onClick={this.onDelete} data-file={file}>[x]</a>
                                </li>*/
                            )
                        }
                    </ul>
                }
            </div>
        </main>
    }
}

export default Contacts