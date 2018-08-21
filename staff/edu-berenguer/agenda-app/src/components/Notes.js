import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import logic from '../logic'

class Notes extends Component{

    state = {
        notes : [],
        title:"",
        content:"",
        date:"",
        id:"",
        filterDate:""
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

    handleLogout = (e) => {
        e.preventDefault()
        this.props.handleLogout(e)
    }

    render(){
        return <div class="container-notes">
            <nav class="navbar" role="navigation" aria-label="main navigation">
                <div class="navbar-start">
                <a href="/#/contacts" class="button is-primary">Contacts</a>
                </div>
                <div class="navbar-end">
                    <a href="" onClick={this.handleLogout} class="button is-dark">Logout</a>
                </div>
            </nav>
            {/* <input type="date" min="01-01-2018" value={this.state.filterDate} name="filterDate" onChange={this.handleChange}/> */}
            <div class="container-menu">
                <div class="container-search">
                    <h1 class="is-size-2">Search notes</h1>
                    <input class="input" placeholder="Search date" type="date" min="01-01-2018" value={this.state.filterDate} name="filterDate" onChange={this.handleChange}></input>
                </div>
                {/* <nav> */}
                    {/* <a href="" onClick={this.handleLogout}>Logout</a>
                    <a href="/#/contacts">Contacts</a> */}
                {/* </nav> */}
                <div class="container-add">
                <h1 class="is-size-2">Add notes</h1>
                    <form onSubmit={this.handleSubmit}>
                        {/* <input type="date" min="01-01-2018" value={this.state.filterDate} name="filterDate" onChange={this.handleChange}/> */}
                        {/* <input class="input" type="text" placeholder="Text input"></input> */}
                        {/* <input type="text" name="title" value={this.state.title} onChange={this.handleChange}/> */}
                        {/* <input type="text" name="content" value={this.state.content} onChange={this.handleChange}/> */}
                        {/* <input type="date" min="01-01-2018" value={this.state.date} name="date" onChange={this.handleChange}/> */}
                        
                        <input class="input" placeholder="Title" name="title" value={this.state.title} onChange={this.handleChange}></input>
                        <input class="input" placeholder="Content" name="content" value={this.state.content} onChange={this.handleChange}></input>
                        <input class="input" type="date" min="01-01-2018" value={this.state.date} name="date" onChange={this.handleChange}></input>
                        <button type="submit" class="button is-light">SUBMIT</button>
                    </form>
                </div>
            </div>
            <div class="container-list">
            <h1 class="is-size-2">Notes</h1>
            <ul>
                {this.state.notes.map(note => {
                    if(note.date === this.state.filterDate){
                        return <li key={note.id}> 
                        {`TITTLE: ${note.title} 
                        CONTENT: ${note.content} 
                        DATE: ${note.date}`} 
                        <a href=""  class="icon has-text-danger" onClick={(e) =>  {
                            e.preventDefault();this.deleteNote(note.id)}} 
                            >X</a> 
                        <a href="" onClick={
                            (e) => this.editNote(e,note)}>EDIT ME 
                            </a> 
                        </li>
                    }else if(!this.state.filterDate){
                        return <li key={note.id}> {
                            `TITLE: ${note.title} 
                            CONTENT: ${note.content} 
                            DATE: ${note.date}`} 
                            <a class="icon has-text-danger" href="" onClick={
                                (e) =>  {
                                e.preventDefault();
                                this.deleteNote(note.id)}} >X
                            </a> 
                            <a href="" onClick={
                                (e) => this.editNote(e,note)}>EDIT ME 
                            </a> 
                        </li>
                    }   
                    })
                }     
            </ul>
            </div>
        </div>
    }

}

export default withRouter(Notes)