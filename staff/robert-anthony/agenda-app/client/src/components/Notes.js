import React, {Component} from 'react'
import logic from '../logic'
import getToday from '../helpers/getToday'

class Notes extends Component {
  state = {
    notes: [],
    error: null,
    date: this.props.currentDate,
    amEditing: false,
    currentNote:null
  }

  componentDidMount = () => {
    this.getNotesForDate(this.props.currentDate)
  }

  getNotesForDate = (date) => {
    logic.getAllNotes(this.props.username, date,this.props.token)
      .then(res => {
        console.log(date,res)
        this.setState({notes: res})
      })
      .catch(({message}) => this.setState({error: message}))
  }

  onKeepDate = (e) => {
    e.preventDefault()
    this.getNotesForDate(e.target.value)
    this.setState({date: e.target.value})
    this.props.onChangeCurrentDate(e.target.value)

  }

  onDeleteNote = (note) => {
    logic.deleteNote(this.props.username,note,this.props.token)
      .then(() => this.getNotesForDate(this.state.date))
      .catch(({message}) => this.setState({error: message}))
  }

  onKeepEditText = (e) => {
    e.preventDefault()
    const note = this.state.currentNote
    note.text = e.target.value
    this.setState({currentNote:note})

  }


  onUpdateNote = (e) => {

    e.preventDefault()
    logic.updateNote(this.props.username,this.state.currentNote,this.props.token)
      .then(res => this.setState({amEditing:false,currentNote:null}))
      .catch(err => this.setState({error: err.message}))
  }

  enterEditingMode = (note) => {
    this.setState({amEditing: true,currentNote:note})
  }

  render() {
    const {state: {currentNote,error, notes, amEditing}} = this

    return <main>
      <div className="screen">
        <h2>{this.props.currentDate}</h2>
        {!amEditing && <div id="notEditing">
          <form>
            <input value={this.state.date} type="date" onChange={this.onKeepDate}/>

          </form>
          <ul>
            {notes.map(note => <li key={note.id}> {`${note.text}`} <a href="" onClick={(e)=>{e.preventDefault();this.enterEditingMode(note)}}><i
              className="fas fa-edit"></i></a>&nbsp;<a href="" onClick={(e)=>{e.preventDefault();this.onDeleteNote(note)}}><i
              className="fas fa-trash-alt"></i></a></li>)}
          </ul>
          {error && <h3>{error}</h3>}

          <a href="/#/addnote">Add Note</a>
        </div>}
        {amEditing && <div id="editing">
          <form onSubmit={this.onUpdateNote}>
            <input type="text" value={currentNote.text} onChange={this.onKeepEditText}/>
            <button type="submit" >Update Note</button>
          </form>
        </div>}
      </div>
    </main>
  }
}

export default Notes