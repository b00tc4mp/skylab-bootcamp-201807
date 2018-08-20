import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import logic from '../logic'

class Notes extends Component{

    state = {
        notes : [],
        title:"",
        content:"",
        date:"",
        id:""
    }

    componentDidMount(){
        const {usermail,token} = this.props
        logic.listNotes(usermail,token)
            .then((notes) => {
                this.setState({
                    notes
                })
            })
    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const {usermail,token} = this.props
        const {title,content,date,id} = this.state
        if(id){
            logic.updateNotes(usermail,id,title,content,date,token)
                .then(() => this.setState({
                    id:"",
                    title:"",
                    content:"",
                    date:""
                }))
                .then(() => this.listNotes())
        } else {
            logic.addNotes(usermail,title,content,date,token)
                .then(() => this.setState({
                    title:"",
                    content:"",
                    date:""
                }))
                .then(() => this.listNotes())
        }
        
    }

    listNotes = () => {
        const {usermail,token} = this.props
        logic.listNotes(usermail,token)
            .then(notes => {
                this.setState({
                    notes
                })
            })
    }

    deleteNote = (id) => {
        const {usermail,token} = this.props
        logic.deleteNote(usermail,id,token)
            .then(() => {
                this.setState({
                    id:""
                })
                this.listNotes()
            })
    }

    editNote = (e,note) => {
        e.preventDefault()
        const {id,title,content,date} = note
        this.setState({
            id,
            title,
            content,
            date
        })
    }



    render(){
        return <div>
            <h1>NOTES</h1>
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="title" value={this.state.title} onChange={this.handleChange}/>
                <input type="text" name="content" value={this.state.content} onChange={this.handleChange}/>
                <input type="date" min="01-01-2018" value={this.state.date} name="date" onChange={this.handleChange}/>
                <button type="submit">SUBMIT</button>
            </form>
            <ul>
                {this.state.notes.map(note => <li key={note.id}> {`TITULO: ${note.title} CONTENIDO: ${note.content} FECHA: ${note.date}`} <a href="" onClick={(e) =>  {e.preventDefault();this.deleteNote(note.id)}} >X</a> <a href="" onClick={(e) => this.editNote(e,note)}>EDIT ME </a> </li>)}
            </ul>
        </div>
    }

}

export default withRouter(Notes)