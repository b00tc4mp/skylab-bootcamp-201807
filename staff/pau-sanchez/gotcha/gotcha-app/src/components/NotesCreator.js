import React, {Component} from 'react'

import SidebarNotes from '../components/SidebarNotes'
import {logic} from '../logic'

export default class NotesCreator extends Component {

state = {
    seconds: '',
    notetitle: '',
    notetext: '',
    notebook: '',
}

static getDerivedStateFromProps(props) {
    
      return {
        seconds: props.passSeconds,
        notebook: props.passNoteBookId
      }
  }



inputNoteTitle = e => this.setState({ notetitle: e.target.value})
inputNoteText = e => this.setState({ notetext: e.target.value})

buildNote = e => {
    e.preventDefault()

    const userId = sessionStorage.getItem('userId')
    const token = sessionStorage.getItem('token')

    const { seconds, notetitle, notetext, notebook} = this.state

    logic.createNote(seconds, notetitle, notetext, notebook, userId, token)

    this.child.method()

    
}

/*
onClick = () => {
    this.child.method() // do stuff
}
*/

render () {
    return (
            <div>
                <form onSubmit={this.buildNote}>
                    <input type="text" name="notetitle" placeholder="notetitle" onChange={this.inputNoteTitle} />
                    <input type="text" name="notetext" placeholder="notext" onChange={this.inputNoteText} />
                    <button type="submit">Submit</button>
                </form>

                    <SidebarNotes onRef={ref => (this.child = ref)} />
                   {/* <button onClick={this.onClick}>SidebarNotes.method()</button>*/}

            </div>
    )
}


}