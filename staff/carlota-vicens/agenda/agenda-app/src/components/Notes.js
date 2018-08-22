import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import logic from "../logic";

class Notes extends Component {
  state = {
    notes: [],
    title: "",
    content: "",
    date: "",
    id: "",
    filterDate: ""
  };

  componentDidMount() {
    this.listNotes()
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { usermail,userID, token } = this.props;
    const { title, content, date, id } = this.state;
    if (id) {
      logic
        .updateNotes(usermail,userID ,id, title, content, date, token)
        .then(() =>
          this.setState({
            id: "",
            title: "",
            content: "",
            date: ""
          })
        )
        .then(() => this.listNotes());
    } else {
      logic
        .addNotes(usermail,userID ,title, content, date, token)
        .then(() =>
          this.setState({
            title: "",
            content: "",
            date: ""
          })
        )
        .then(() => this.listNotes());
    }
  };

  listNotes = () => {
    const { userID, token } = this.props;
    return logic.listNotes(userID, token).then(({notes}) => {
      
      this.setState({
        notes
      });
    });
  };

  deleteNote = id => {
    const { userID, token } = this.props;
    logic.deleteNote(userID, id, token).then(() => {
      this.setState({
        id: ""
      });
      this.listNotes();
    });
  };

  editNote = (e, note) => {
    e.preventDefault();
    const { _id, title, content, date } = note;
    this.setState({
      id:_id,
      title,
      content,
      date
    });
  };

  render() {
    return (
      <div>
        <h1>NOTES</h1>
        <input
          type="date"
          min="01-01-2018"
          value={this.state.filterDate}
          name="filterDate"
          onChange={this.handleChange}
        />
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="content"
            value={this.state.content}
            onChange={this.handleChange}
          />
          <input
            type="date"
            min="01-01-2018"
            value={this.state.date}
            name="date"
            onChange={this.handleChange}
          />
          <button type="submit">SUBMIT</button>
        </form>
        <ul>
          {this.state.notes.map(note => {
            if(this.state.filterDate === note.date){
             return <li key={note._id}>
              {`TITULO: ${note.title} CONTENIDO: ${note.content} FECHA: ${
                note.date
              }`}
              <a
                href=""
                onClick={e => {
                  e.preventDefault();
                  this.deleteNote(note._id)
                }}
              >
                X
              </a>
              &nbsp;
              <a href="" onClick={e => this.editNote(e, note)}>
                EDIT ME
              </a>
            </li>
            } else if(!this.state.filterDate){
              return <li key={note._id}>
              {`TITULO: ${note.title} CONTENIDO: ${note.content} FECHA: ${
                note.date
              }`}
              <a
                href=""
                onClick={e => {
                  e.preventDefault();
                  this.deleteNote(note._id)
                }}
              >
                X
              </a>
              &nbsp;
              <a href="" onClick={e => this.editNote(e, note)}>
                EDIT ME
              </a>
            </li>
            }
          })}
          <button onClick={this.listNotes}>GET NOTES</button>
        </ul>
      </div>
    );
  }
}

export default withRouter(Notes);

// {this.state.notes.map(note => {
//   <li key={note._id}>
//     {`TITULO: ${note.title} CONTENIDO: ${note.content} FECHA: ${
//       note.date
//     }`}
//     <a
//       href=""
//       onClick={e => {
//         e.preventDefault();
//         this.deleteNote(note._id);
//       }}
//     >
//       X
//     </a>
//     <a href="" onClick={e => this.editNote(e, note)}>
//       EDIT ME
//     </a>
//   </li>;
// })}
