import React, {Component} from 'react';
import ReactPlayer from 'react-player'
import EditorNotesBar from './EditorNotesBar';
import {logic} from '../logic'
import { withRouter } from 'react-router-dom'
import { Form, FormGroup, Label, Row, Col, Button, Input } from 'reactstrap';

class NotebookScreen extends Component {

    state = {
        seconds: '',
        notetitle: '',
        notetext: '',
        notebook: '',
        items: [],
        notes:[],
        url: null ,
        videoSlugId: '',
        playing: true,
        volume: 0.8,
        muted: false,
        played: 0,
        loaded: 0,
        duration: 0,
        playbackRate: 1.0,
        loop: false,
        newNoteTitle: '',
        newNoteText: '',
        newNoteSeconds: '',
        videoTitle:'',
        noteBookId: '',
        notebookTitle: '',
        notebookStage: true, /*IF TRUE Display only notebook title & url form// IF FALSE Hide form*/
        gotchaStage: false, /*IF TRUE Display gotcha button//IF FALSE Hide Button*/
        noteStage: false, /*IF TRUE Display note form//IF FALSE Hide form notes*/
        formErrors: {url: ''},
        urlValid: false,
        formValid: false,
        notebooktitle: '',
        homeNotebookTitle: '',
        landingNotebookTitle: '',
        origin: '',
        loggedOut: '',
    }

    componentDidMount() {
        const {editor, id} = this.props.match.params
        const token = sessionStorage.getItem('token')
        
        return logic.listNotebooksByNotebookId(editor, id)
        .then(res => {
            this.setState({ url: res.videourl})
            this.setState({ noteBookId: res._id})
            this.setState({ notebookTitle: res.notebooktitle })
            this.setState({ videoTitle: res.videotitle})
            this.setState({ loggedOut: token})
        })
        .then(() => this.child.method(editor, id) )
        .then(this.setState({ gotchaStage: true}))
    }

    load = url => {
        this.setState({
          url,
          played: 0,
          loaded: 0
        })
    }
    
    onProgress = state => {
        if (!this.state.seeking) {
          this.setState(state)
        }
    }
    
    
    ref = player => {
        this.player = player
    }
    
    inputVideoUrl = e => this.setState({ url: e.target.value})
    inputTitle = e => this.setState({ notebooktitle: e.target.value})


    buildNotebook = e => {
        e.preventDefault()

        const userId = sessionStorage.getItem('userId')
        const token = sessionStorage.getItem('token')

        const { url, notebooktitle} = this.state
        
        return Promise.resolve()
        .then(() => {
            logic.createNotebook(userId, notebooktitle, url, token)
            .then(res => { this.setState({ notebook: res.notebookdId})})
            })
    }        

    inputNoteTitle = e => this.setState({ notetitle: e.target.value})
    inputNoteText = e => this.setState({ notetext: e.target.value})
    
    buildNote = e => {
        e.preventDefault()
    
        const userId = sessionStorage.getItem('userId')
        const token = sessionStorage.getItem('token')
    
        const { gotchaSeconds, notetitle, notetext, noteBookId} = this.state
        
        return Promise.resolve()
            .then(() => {
                return logic.createNote(gotchaSeconds, notetitle, notetext, noteBookId, userId, token)
            })
            .then(() => {
                return this.child.method(userId, noteBookId)
            })
            .then(() => {
                this.setState({ noteStage: false})
            })
            .then(() => {
                this.setState({notetitle: '' })
                this.setState({notetext: '' })
                this.setState({gotchaSeconds: '' })
                
            })
    }

    gotcha = () => {
        const {playedSeconds} = this.state

        this.setState({gotchaSeconds : playedSeconds})
        this.setState({ noteStage: true})
    }
    
    secondsForm = (secs) => {
        return Math.floor(secs - (Math.floor(secs/60)) * 60)
    }
    
    minutesForm = (secs) => {
        return Math.floor(secs/60)
     }

    setSeekToPlay = (seconds) => {
        this.player.seekTo(seconds)
    }
    
    loggedOut = () => {
        const token = sessionStorage.getItem('token')
        (!!token) ? this.setState({loggedOut: false}) : this.setState({loggedOut: true})
    }


    render () 
        {
        const { url, playing, gotchaSeconds, notebookTitle, fakenotes } = this.state
        const gotchaStage = this.state.gotchaStage
        const noteStage = this.state.noteStage
        const loggedOut = this.state.loggedOut
        
        return(
                <div>               
                    <div>
                        <Row className='editor_rowcontainer'>
                            <Col className='editor_coleditor'>
                                <div className='appeditor'>
                                    <div className='player-wrapper'>
                                        <ReactPlayer
                                            ref={this.ref}
                                            width='100%'
                                            height='100%'
                                            url={url}
                                            playing={playing}
                                            onPlay={this.onPlay}
                                            onProgress={this.onProgress}
                                            youtubeConfig={{ playerVars: { controls: 1 } }}
                                            />
                                    </div>
                       
                                    {
                                    (gotchaStage && loggedOut)
                                    ?<div id="gotchaStage" className='gotchaStage'>
                                        <Button color='danger' onClick={this.gotcha}>GOTCHA!</Button>
                                    </div>
                                    : <div></div>
                                    }
                    
                                    {
                                    noteStage
                                    ?<div  id="noteStage" className='noteStage'>
                                        <Form onSubmit={this.buildNote}>
                                            <FormGroup row>
                                                <Label sm={2}>Moment</Label>
                                                <Col sm={8}>
                                                <Input type="text" value={this.minutesForm(gotchaSeconds)+`:`+this.secondsForm(gotchaSeconds)} onChange={this.inputNoteTitle} disabled/>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label sm={2}>Title</Label>
                                                <Col sm={8}>
                                                    <Input type="text" name="notetitle" onChange={this.inputNoteTitle} required/>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label  sm={2}>Text</Label>
                                                <Col sm={8}>
                                                    <Input type="textarea" name="notetext" onChange={this.inputNoteText} />
                                                </Col>
                                                <Button sm={2} type="submit">Submit</Button>
                                            </FormGroup>
                                        </Form>
                                    </div>
                                    : <div></div>
                                    }

                                </div>
                            </Col>
                            <Col className='editor_colsidebar'>
                                <h3>{notebookTitle}</h3>
                                <EditorNotesBar onRef={ref => (this.child = ref)} seektoPass={this.setSeekToPlay}/>

                                {
                                (this.state.origin === "landing")
                                ?<div>
                                    <h1>FakeNotes</h1>
                                        <div>
                        
                                            {fakenotes.map(({ gotchaSeconds, notetext, notetitle}) => (
                                                
                                                    <div>
                                                        <span>Title: {notetitle}  </span> 
                                                        <span>Text: {notetext}  </span>
                                                        <span>Time: {Math.floor(gotchaSeconds/60)}:{Math.floor(gotchaSeconds - (Math.floor(gotchaSeconds/60)) * 60)}  </span>
                                                        <Button className="remove-btn" color="danger" size="sm"  onClick={() => this.setSeekToPlay(gotchaSeconds)}>SeekTo</Button>
                                                    </div>
                                                
                                            ))}
                        
                                        </div>
                                </div>
                                :<div></div>    
                                }
  
                            </Col>
                        </Row>
                    </div>
                </div>      
         
        )
    }

}

export default withRouter(NotebookScreen)
