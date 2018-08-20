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
    this.getNotesForDate()
  }

  getNotesForDate = () => {
    logic.getAllNotes(this.props.username, this.props.token)
      .then(res => res.filter(note => note.date === this.state.date))
      .then(res => this.setState({notes: res}))
      .catch(({message}) => this.setState({error: message}))
  }

  onKeepDate = (e) => {
    e.preventDefault()
    this.getNotesForDate()
    this.setState({date: e.target.value})
    this.props.onChangeCurrentDate(e.target.value)

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
            {notes.map(note => <li key={note.id}>{`${note.date} ${note.text}`} <a href="" onClick={(e)=>{e.preventDefault();this.enterEditingMode(note)}}><i
              className="fas fa-edit"></i></a></li>)}
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