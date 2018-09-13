import React from 'react'
import {logic} from '../logic'
import {FormGroup, Input, Button, Card} from 'reactstrap'
import Loader from 'react-loader-spinner'

class EditorNotesBar extends React.Component {

    state = {
        notes : [],
        userId: '',
        notebookid: '',
        newnotetitle: '',
        newnotetext: '',
        loggedOut: '',
        edit: '',
        loading: false
        
    }
    
    componentDidMount() {
        this.props.onRef(this)
      }
    componentWillUnmount() {
        this.props.onRef(null)
      }
      
    method(userId, notebookid) {
        this.setState({userId : userId})
        this.setState({ notebookid: notebookid})
        const token = sessionStorage.getItem('token')
        return Promise.resolve()
            .then(() => {
                logic.listNotebyNotebookId(userId, notebookid)
                .then(res => {
                this.setState({notes: res})
                this.setState({ loggedOut: token})
                })
            
            })
    }
                

    refreshList = () => {
        const {userId, notebookid} = this.state
        logic.listNotebyNotebookId(userId, notebookid)
        .then(res => {
            this.setState({loading: false})
            this.setState({notes: res})
        })
    }

    deleteNote(noteid) {
        const {userId} = this.state
        const token = sessionStorage.getItem('token')
        const sessionuserid = sessionStorage.getItem('userId')
        this.setState({loading: true})
        logic.removeNote(userId, sessionuserid, noteid, token)
        .then(() => {
            return this.refreshList()
        })
        .then( this.setState({edit: ''}))
        .then( this.setState({ newnotetext: ''}))
        .then( this.setState({ newnotetitle: ''}))
    }
    

    updateNoteForm = (_id) =>{
    const {userId, newnotetitle, newnotetext } = this.state
        const token = sessionStorage.getItem('token')
        const sessionuserid = sessionStorage.getItem('userId')
        this.setState({ loading: true})
        logic.updateNote(userId, sessionuserid, _id, newnotetitle, newnotetext, token)
        .then(() => {
            return this.refreshList()
        })
        .then( this.setState({edit: ''}))
        .then( this.setState({ newnotetext: ''}))
        .then( this.setState({ newnotetitle: ''}))
    }
        
    onChangeNoteTitle = e => this.setState({ newnotetitle: e.target.value})
    onChangeNoteText = e => this.setState({ newnotetext: e.target.value})

    secondsForm = (secs) => {
        return Math.floor(secs - (Math.floor(secs/60)) * 60)
    }
    
    minutesForm = (secs) => {
        return Math.floor(secs/60)
    }

    render() {
            
        const {notes, loggedOut, edit, loading} = this.state

                return <div>
                    
                    {
                    (loading)
                    ?<Loader type="Puff" color="#00BFFF" height="100" width="100"/>
                    :<div>                   
                        {notes.map(({ notetext, notetitle, seconds, _id }) => (
                        <div>
                            <Card className='notesCards'>    
                                <FormGroup row>
                                        <Input className='inputCard' type="text" value={this.minutesForm(seconds)+`:`+this.secondsForm(seconds)} disabled/>
                                </FormGroup>
                                {
                                (edit === _id)
                                ?<div>
                                    <FormGroup row>
                                        <Input className='inputCard' type="text" name="notetitle" defaultValue={notetitle} onChange={this.onChangeNoteTitle} required/>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Input className='inputCard' type="textarea" name="notetext" defaultValue={notetext} onChange={this.onChangeNoteText} />
                                    </FormGroup>
                                </div>
                                :<div>
                                    <FormGroup row>
                                        <Input type="text" className='inputCard' name="notetitle" value={notetitle} onChange={this.onChangeNoteTitle} required disabled/>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Input type="textarea" className='inputCard' name="notetext" value={notetext} onChange={this.onChangeNoteText} disabled/>
                                    </FormGroup>
                                </div>
                                }
                                {
                                (loggedOut)
                                ?<div className='optionnotes'>
                                    {
                                        (this.state.edit === _id && (this.state.newnotetitle !== '' || this.state.newnotetext !== ''))
                                        ? <Button className='mr-1' onClick={() => this.updateNoteForm(_id)}>Save Changes&#128394;</Button>
                                        : <Button className='mr-1' onClick={() => this.setState({ edit: _id})}>Edit Note&#128394;</Button>
                                    }
                                    
                                    <Button className='mr-1' onClick={() => this.deleteNote(_id)}>&#10799;</Button>
                                    <Button className='mr-1' onClick={() => this.props.seektoPass(seconds)}>&#9654;</Button>
                                </div>
                                :<div className='optionnotes'>
                                    <Button  onClick={() => this.props.seektoPass(seconds)}>&#9654;</Button>
                                </div>
                                }
                            </Card>    
                        </div>
                        ))}
                    </div>
                    }
            </div>
      }
}
    

export default EditorNotesBar;
                                                
                                                
                                                
                                                
                                                

                                                
                                                
                                               
                                                
                                                
                                               
                                    