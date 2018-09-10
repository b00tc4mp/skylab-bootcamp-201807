import React from 'react'
import {logic} from '../logic'
import { withRouter, Link } from 'react-router-dom'
import {FormGroup, Input, Button, Form, Label, Col, Card, Table} from 'reactstrap'
class ListingNotes extends React.Component {

    

    state = {
        notes : [],
        userId: '',
        notebookid: '',
        newnotetitle: '',
        newnotetext: '',
        notesNotebooksInfo: [],
        edit: ''
        
    }
    
    componentDidMount() {
        const token = sessionStorage.getItem('token')
        const sessionuserid = sessionStorage.getItem('userId')
        this.setState({userId : sessionuserid})
        
        
        
          console.log('do stuff')
          
          return Promise.resolve()
              .then(() => {
                  logic.listNotesbyUser(sessionuserid, token)
                  .then(res => {
                      this.setState({notes: res})
                      console.log(res)
                  })
                  .then(() => this.getNotebookInfo())
              })
            }

    getNotebookInfo = () => {
        
        const sessionuserid = sessionStorage.getItem('userId')
        const {notes} = this.state
        console.log('getNotebookInfo')
        const withInfo = []

        notes.map(note => {
            
            return Promise.resolve()
            .then(() => {
                console.log(note.notebook)
                return logic.listNotebooksByNotebookId(sessionuserid, note.notebook) 
            })
            .then(res => {
                note.notebooktitle = res.notebooktitle
                note.videotitle = res.videotitle
                note.videothumbnail = res.videothumbnail
            })
            .then(() => console.log(note))
            .then(withInfo.push(note))
            .then(() => this.setState({notesNotebooksInfo: withInfo}))
        })
    }

    getNotes = () => {

    }

    secondsForm = (secs) => {
        return Math.floor(secs - (Math.floor(secs/60)) * 60)
    }
    
    minutesForm = (secs) => {
        return Math.floor(secs/60)
     }
      
      

    refreshList = () => {
        const token = sessionStorage.getItem('token')
        const sessionuserid = sessionStorage.getItem('userId')
        logic.listNotesbyUser(sessionuserid, token)
        
        .then(res => {
            this.setState({notes: res})
        })
    }

    refresh = () => {
        const token = sessionStorage.getItem('token')
        const sessionuserid = sessionStorage.getItem('userId')
        
        return Promise.resolve()
              .then(() => {
                  logic.listNotesbyUser(sessionuserid, token)
                  .then(res => {
                      this.setState({notes: res})
                      console.log(res)
                  })
                  .then(() => {
                      return this.getNotebookInfo()
                  })
              })
            
    }

    deleteNote =(noteid)=> {
        const {userId} = this.state
        const token = sessionStorage.getItem('token')
        const sessionuserid = sessionStorage.getItem('userId')
        console.log(noteid)
        logic.removeNote(userId, sessionuserid, noteid, token)
        .then(() => {
            return this.refresh()
        })
    }
    

    updateNoteForm = (_id) =>{
    const {userId, newnotetitle, newnotetext } = this.state
        const token = sessionStorage.getItem('token')
        const sessionuserid = sessionStorage.getItem('userId')
        //const noteIdtoEdit = sessionStorage.getItem('noteIdtoEdit')
        console.log(_id)
        logic.updateNote(userId, sessionuserid, _id, newnotetitle, newnotetext, token)
        .then(() => {this.setState({ edit: ''})})
        .then(() => {
            return this.refresh()
        })
    }

    //idState = (_id) => this.setState({noteIdtoEdit : _id})
    //idState = (_id) => sessionStorage.setItem('noteIdtoEdit', _id)

    onChangeNoteTitle = e => this.setState({ newnotetitle: e.target.value})
    onChangeNoteText = e => this.setState({ newnotetext: e.target.value})

    
    editable = e => {
        e.preventDefault()
        console.log(e.target.name)
    }


      render() {
                        const {notes, notesNotebooksInfo, notetext, notetitle, seconds, _id, user, notebook, notebooktitle, videotitle,} = this.state
        return <div>
            
            <div>
                   
                                
                                
                                <div>
                                    <Table responsive>
                                        <thead>
                                            <tr>
                                                
                                                <th>Moment</th>
                                                <th>Title</th>
                                                <th>Text</th>
                                                <th>Notebook</th>
                                                <th>Video</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        
                        {notesNotebooksInfo.map(({ notetext, notetitle, seconds, _id, user, notebook, notebooktitle, videotitle, videothumbnail}) => (
                                        <tbody>
                                            <tr>
                                                <td>
                                                    {this.minutesForm(seconds)+`:`+this.secondsForm(seconds)}
                                                </td>
                                                <td>
                                                    {notetitle}    
                                                </td>
                                                <td>
                                                    {notetext}    
                                                </td>
                                                <td>
                                                    {notebooktitle}    
                                                </td>
                                                <td>
                                                    {videotitle}    
                                                </td>
                                                <td>
                                                    <Link to={`/noteplayer/${_id}/${user}`}>
                                                        <Button sm={2} >&#9654; Note</Button>
                                                    </Link>
                                                    <Link to={`/player/${notebook}/${user}`}>
                                                        <Button type='button'>&#9654; Notebook</Button>
                                                    </Link>    
                                                        <Button sm={2} onClick={() => {this.deleteNote(_id)}}>Delete &#10799;</Button>
                                                </td>
                                            </tr>
                                        </tbody>

                                    ))}

                                    </Table>
                                </div>


                                
                                {/*
                                <div>
                                    <Card className='NotesCards'>    
                                <FormGroup row>
                                        <Label sm={2}>Moment</Label>
                                        <Col sm={8}>
                                        <Input type="text" value={this.minutesForm(seconds)+`:`+this.secondsForm(seconds)} disabled/>
                                        </Col>
                                    </FormGroup>
                                    {
                                        (this.state.edit === _id)
                                        ? <div>
                                            <FormGroup row>
                                                <Label sm={2}>Title</Label>
                                                    <Col sm={8}>
                                                    <Input type="text" name='notetitle' defaultValue={notetitle} onChange={this.onChangeNoteTitle}   required/>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label  sm={2}>Text</Label>
                                                <Col sm={8}>
                                                    <Input type="textarea" name="notetext" defaultValue={notetext} onChange={this.onChangeNoteText} />
                                                </Col>
                                            </FormGroup>
                                        </div>
                                        : <div>
                                        <FormGroup row>
                                            <Label sm={2}>Title</Label>
                                                <Col sm={8}>
                                                <Input type="text" name='notetitle' defaultValue={notetitle} onChange={this.onChangeNoteTitle}  disabled required/>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label  sm={2}>Text</Label>
                                            <Col sm={8}>
                                                <Input type="textarea" name="notetext" defaultValue={notetext} onChange={this.onChangeNoteText} disabled/>
                                            </Col>
                                        </FormGroup>
                                    </div>
                                    }
                                    
                                        <FormGroup row>
                                        <Label  sm={2}>notebooktitle</Label>
                                        <Col sm={8}>
                                            <p>{notebooktitle}</p>
                                        </Col>
                                        
                                        </FormGroup>
                                        <FormGroup row>
                                        <Label  sm={2}>videotitle</Label>
                                        <Col sm={8}>
                                            <p>{videotitle}</p>
                                        </Col>
                                        
                                        </FormGroup>
                                        <div className='optionnotes'>
                                        {
                                            (this.state.edit === _id)
                                            ? <Button sm={2} onClick={() => this.updateNoteForm(_id)}>Save Changes&#128394;</Button>
                                            : <Button onClick={() => this.setState({ edit: _id})}>EDIT</Button>
                                        }
                                        
                                        
                                        <Button sm={2} onClick={() => {this.deleteNote(_id)}}>&#10799;</Button>
                                            <Link to={`/noteplayer/${_id}/${user}`}>
                                                <Button sm={2} >&#9654; Note</Button>
                                            </Link>
                                            <Link to={`/player/${notebook}/${user}`}>
                                                <Button type='button'>&#9654; Notebook</Button>
                                            </Link>
                                        </div>
                            </Card>
                                </div>
                                */}
                                
                            
                        
                    
                </div>
            </div>
      }
    }
    

export default withRouter(ListingNotes)