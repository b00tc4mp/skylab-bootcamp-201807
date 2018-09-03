import React, {Component} from 'react'
import NotesPlayer from '../components/NotesPlayer'
import Notebookcreator from '../components/NoteBookCreator'
import NotesCreator from '../components/NotesCreator'


export default class Editor extends Component {
    constructor(props) {
        super(props);

    this.state = {
        url: '',
        seconds: '',
        notebookId: ''
    }
}
    setUrl = (url) => {
        this.setState({ url: url})
    }
    setSeconds = (state) => {
        this.setState({ seconds: state.playedSeconds})
    }

    setNotebookId = (Id) => {
        this.setState({ notebookId: Id})
    }

    //////////

    


    //////////
    render() {
 
        return (
            <div>
                <h1>EDITOR</h1>
                <Notebookcreator urlPass={this.setUrl} NotebookIdPass={this.setNotebookId}/>
                <NotesPlayer passUrl={this.state.url} secondsPass={this.setSeconds}/>
                <NotesCreator passSeconds={this.state.seconds} passNoteBookId={this.state.notebookId}/>
                
                

            </div>
        )
    }
}

