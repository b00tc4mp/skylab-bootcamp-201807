import React from 'react'
import {logic} from '../logic'
import { withRouter, Link } from 'react-router-dom'
import {Button, Table} from 'reactstrap'
import Loader from 'react-loader-spinner'
class ListingNotes extends React.Component {

    state = {
        notes : [],
        userId: '',
        notebookid: '',
        newnotetitle: '',
        newnotetext: '',
        notesNotebooksInfo: [],
        edit: '',
        loading: false
    }
    
    componentDidMount() {
        const token = sessionStorage.getItem('token')
        const sessionuserid = sessionStorage.getItem('userId')
        this.setState({userId : sessionuserid})
        this.setState({ loading: true})
        return Promise.resolve()
            .then(() => {
                logic.listNotesbyUser(sessionuserid, token)
                .then(res => {
                    this.setState({notes: res})
                  })
                  .then(() => this.getNotebookInfo())
                  .then(() => this.setState({ loading: false}))
              })
    }

    getNotebookInfo = () => {
        
        const sessionuserid = sessionStorage.getItem('userId')
        const {notes} = this.state
        const withInfo = []

        notes.map(note => {
            
            return Promise.resolve()
            .then(() => {
                return logic.listNotebooksByNotebookId(sessionuserid, note.notebook) 
            })
            .then(res => {
                note.notebooktitle = res.notebooktitle
                note.videotitle = res.videotitle
                note.videothumbnail = res.videothumbnail
            })
            .then(withInfo.push(note))
            .then(() => this.setState({notesNotebooksInfo: withInfo}))
        })
    }
        
    secondsForm = (secs) => {
        return Math.floor(secs - (Math.floor(secs/60)) * 60)
    }
    
    minutesForm = (secs) => {
        return Math.floor(secs/60)
    }
    
    refresh = () => {
        const token = sessionStorage.getItem('token')
        const sessionuserid = sessionStorage.getItem('userId')
        
        return Promise.resolve()
              .then(() => {
                  logic.listNotesbyUser(sessionuserid, token)
                  .then(res => {
                      this.setState({notes: res})
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
        logic.removeNote(userId, sessionuserid, noteid, token)
        .then(() => {
            return this.refresh()
        })
    }
        
    updateNoteForm = (_id) =>{
    const {userId, newnotetitle, newnotetext } = this.state
        const token = sessionStorage.getItem('token')
        const sessionuserid = sessionStorage.getItem('userId')
        logic.updateNote(userId, sessionuserid, _id, newnotetitle, newnotetext, token)
        .then(() => {this.setState({ edit: ''})})
        .then(() => {
            return this.refresh()
        })
    }
    
    onChangeNoteTitle = e => this.setState({ newnotetitle: e.target.value})
    onChangeNoteText = e => this.setState({ newnotetext: e.target.value})
          
          
    render() {
            const {notesNotebooksInfo, loading } = this.state
            return <div>
                        <div>
                            <div>

                                {
                                (loading)
                                ?<div className='player-wrapper-note'>
                                    <Loader type="Puff" color="#00BFFF" height="100" width="100"/> 
                                </div>
                                :<Table responsive>
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
                                                        <Button className='mx-2'>&#9654; Note</Button>
                                                    </Link>
                                                    <Link to={`/player/${notebook}/${user}`}>
                                                        <Button className='mx-2' type='button'>&#9654; Notebook</Button>
                                                    </Link>    
                                                        <Button  className='mx-2' onClick={() => {this.deleteNote(_id)}}>Delete &#10799;</Button>
                                                </td>
                                            </tr>
                                        </tbody>

                                    ))}
                                </Table>
                                }

                            </div>
                        </div>
                    </div>
    }
}

            
export default withRouter(ListingNotes)
                   
                                
                                
    


                                
                                
                                
                            
                        
                    