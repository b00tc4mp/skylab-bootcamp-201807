import React, {Component} from 'react';
import ReactPlayer from 'react-player'
import {logic} from '../logic'
import { withRouter } from 'react-router-dom'
import {FormGroup, Input, Button, Label, Col, Row} from 'reactstrap'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Loader from 'react-loader-spinner'

class NoteScreen extends Component {

    state = {
        userId: '',
        seconds: '',
        notetitle: '',
        notetext: '',
        notebook: '',
        notes:[],
        fakenotes:[],
        url: null ,
        preurl: null,
        playing: true,
        played: 0,
        newnotetitle: '',
        newnotetext: '',
        newNoteSeconds: '',
        videoTitle:'',
        noteBookId: '',
        noteId: '',
        notebooktitle: '',
        loggedOut: '',
        loading: false
    }

    componentDidMount() {
        const {editor, noteid} = this.props.match.params
        const token = sessionStorage.getItem('token')
        return logic.listNotesbyNoteId(editor, noteid)
        .then(res => {
            this.setState({loading: true})
            this.setState({ seconds: res.seconds })
            this.setState({ noteBookId: res.notebook })
            this.setState({ notetitle: res.notetitle})
            this.setState({ notetext: res.notetext})
            this.setState({ userId: res.user})
        })
        .then(() => {
            return logic.listNotebooksByNotebookId(editor, this.state.noteBookId)
        })
        .then(res => {
            this.setState({ url : res.videourl})
            this.setState({ notebooktitle: res.notebooktitle})
            this.setState({ videoTitle: res.videotitle})
        })
        .then( () => this.setSeekToPlay(this.state.seconds))
        .then(() => this.setState({noteId: noteid}))
        .then(this.setState({ loggedOut: token}))
    }

    refresh = () => {
        const {userId, noteId } = this.state
        return logic.listNotesbyNoteId(userId, noteId)
        .then(res => {
            this.setState({ seconds: res.seconds })
            this.setState({ noteBookId: res.notebook })
            this.setState({ notetitle: res.notetitle})
            this.setState({ notetext: res.notetext})
            this.setState({ userId: res.user})
        })
        .then(() => {
            return logic.listNotebooksByNotebookId(userId, this.state.noteBookId)
        })
        .then(res => {
            this.setState({ url : res.videourl})
            this.setState({ notebooktitle: res.notebooktitle})
            this.setState({ videoTitle: res.videotitle})
        })        
        .then( () => {
            this.setSeekToPlay(this.state.seconds)
        })
    }

    load = url => {
        this.setState({
          url,
          played: 0,
          loaded: 0
        })
    }
      
    onPlay = () => {
        this.setState({ playing: true })
    }
      
    onProgress = state => {
        if (!this.state.seeking) {
          this.setState(state)
        }
    }
      
    onDuration = (duration) => {
        this.setState({ duration })
    }

    ref = player => {
        this.player = player
    }
    
    updateNoteForm = (noteId) =>{
        const {userId, newnotetitle, newnotetext } = this.state
            const token = sessionStorage.getItem('token')
            const sessionuserid = sessionStorage.getItem('userId')
            
            logic.updateNote(userId, sessionuserid, noteId, newnotetitle, newnotetext, token)
            .then(() => {this.setState({ edit: ''})})
            .then(() => {this.setState({ newnotetitle: ''})})
            .then(() => {this.setState({ newnotetext: ''})})
            .then(() => {
                return this.refresh()
            })
    }
    
    onChangeNoteTitle = e => this.setState({ newnotetitle: e.target.value})
    onChangeNoteText = e => this.setState({ newnotetext: e.target.value})
    
    secondsForm = (secs) => {
        return Math.floor(secs - (Math.floor(secs/60)) * 60)
    }
    
    minutesForm = (secs) => {
        return Math.floor(secs/60)
    }

    deleteNote(noteid) {
        const {userId} = this.state
        const token = sessionStorage.getItem('token')
        const sessionuserid = sessionStorage.getItem('userId')
        logic.removeNote(userId, sessionuserid, noteid, token)
        .then(() => {
            this.props.history.push('/notes')
        })
    }

    setSeekToPlay(seconds) {
        this.player.seekTo(seconds)
    }
        
    render () 
        {
        const { url, playing, noteId, seconds, notetitle, notetext, loggedOut, loading } = this.state
        const urlToShare = window.location.href
        
        return(
            <div className='center-note-player'>
                    <div className='player-wrapper-note'>

                        {
                        (!loading)
                        ?<Loader type="Puff" color="#00BFFF" height="100" width="100"/> 
                        :<ReactPlayer
                            ref={this.ref}
                            width='100%'
                            height='100%'
                            url={url}
                            playing={playing}
                            onPlay={this.onPlay}
                            onProgress={this.onProgress}
                            youtubeConfig={{ playerVars: { controls: 1 } }}
                            />
                        }

                    </div>
                    <div className='gotcha_noteplayer'>
                        <Row >
                            <Col>
                                <Button className="remove-btn" color="danger" size="sm"  onClick={() => this.setSeekToPlay(seconds)}>Play Gotcha! {this.minutesForm(seconds)+`:`+this.secondsForm(seconds)}</Button>
                            </Col>
                            
                        </Row>
                    </div>
                                
                    {
                    (loggedOut)
                    ?<div>
                                
                        {
                        (this.state.edit === noteId)
                        ? <div className='actions_noteplayer'>
                            <Button outline className='mx-2' onClick={() => this.updateNoteForm(noteId)}>Save Changes&#128394;</Button>
                            <CopyToClipboard text={urlToShare}>
                                <Button outline className='mx-2'>Copy Url</Button>
                            </CopyToClipboard>
                            <Button outline className='mx-2' onClick={() => {this.deleteNote(noteId)}}>Delete&#10799;</Button>
                            </div>
                        : <div className='actions_noteplayer'>
                            <Button outline className='mx-2'onClick={() => this.setState({ edit: noteId})}>Edit&#128394;</Button>
                            <CopyToClipboard text={urlToShare}>
                                <Button outline className='mx-2'>Copy Url</Button>
                            </CopyToClipboard>
                            <Button outline className='mx-2' onClick={() => {this.deleteNote(noteId)}}>Delete&#10799;</Button>
                        </div>
                        }

                    </div>
                    :<div></div>
                    }

                    <div>

                        {
                        (this.state.edit === noteId)
                        ? <div className='noteplayer_input'>
                            <FormGroup row>
                                <Col sm={1}></Col>
                                <Label sm={1}>Title</Label>
                                    <Col sm={9}>
                                    <Input type="text" name='notetitle' defaultValue={notetitle} onChange={this.onChangeNoteTitle}   required/>
                                </Col>
                                <Col sm={1}></Col>
                            </FormGroup>
                            <FormGroup row>
                            <Col sm={1}></Col>
                                <Label  sm={1}>Text</Label>
                                <Col sm={9}>
                                    <Input type="textarea" name="notetext" defaultValue={notetext} onChange={this.onChangeNoteText} />
                                </Col>
                                <Col sm={1}></Col>
                            </FormGroup>
                        </div>
                        : <div className='noteplayer_input'>
                            <FormGroup row>
                            <Col sm={3}></Col>
                                <Col sm={6}>
                                    <h5>{notetitle}</h5>
                                </Col>
                                <Col sm={3}></Col>
                            </FormGroup>
                            <FormGroup row>
                            <Col sm={3}></Col>
                                <Col sm={6}>
                                    <p>{notetext}</p>
                                </Col>
                                <Col sm={3}></Col>
                            </FormGroup>
                        </div>

                        }
                        
                    </div>
            </div>
                           
        )
    }
    
}

export default withRouter(NoteScreen)
                                            
                                    
                                        
                                        
                                        
