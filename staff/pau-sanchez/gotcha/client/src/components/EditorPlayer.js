import React, {Component} from 'react';
import ReactPlayer from 'react-player'
import EditorNotesBar from './EditorNotesBar';
import {logic} from '../logic'
import { withRouter } from 'react-router-dom'
import FormErrors from './FormErrors'
import { Form, FormGroup, Label, Row, Col, Button, Input, InputGroup, InputGroupAddon, Card } from 'reactstrap';

class EditorPlayer extends Component {
    state = {
        seconds: '',
        notetitle: '',
        notetext: '',
        notebook: '',
        notes:[],
        fakenotes:[],
        url: null ,
        preurl: null,
        played: 0,
        loaded: 0,
        newNoteTitle: '',
        newNoteText: '',
        newNoteSeconds: '',
        videoTitle:'',
        noteBookId: '',
        isLoggedin: false,
        gotchaSeconds: '',
        notebookStage: true, /*IF TRUE Display only notebook title & url form// IF FALSE Hide form*/
        gotchaStage: false, /*IF TRUE Display gotcha button//IF FALSE Hide Button*/
        noteStage: false, /*IF TRUE Display note form//IF FALSE Hide form notes*/
        formErrors: {url: ''},
        urlValid: false,
        formValid: false,
        notebooktitle: '',
        homeNotebookTitle: '',
        landingNotebookTitle: '',
        origin: ''
    }

    componentDidMount () {
        
        const url = sessionStorage.getItem('landingUrl') || sessionStorage.getItem('homeUrl')
        const notebooktitle = sessionStorage.getItem('landingNotebookTitle') || sessionStorage.getItem('homeNotebookTitle')
        const origin = sessionStorage.getItem('origin')
        
        return Promise.resolve()
            .then(() => {
                this.setState({ preurl : url})
                this.setState({ notebooktitle: notebooktitle })
                this.setState({ origin: origin})
            })
            .then(() => {
                sessionStorage.setItem('landingUrl', '')
                sessionStorage.setItem('homeUrl', '')
                sessionStorage.setItem('landingNotebookTitle', '')
                sessionStorage.setItem('homeNotebookTitle', '')
                sessionStorage.setItem('origin', '')
            }).then(() => {
                if (this.state.origin === 'home') this.setState({notebookStage: false})
                if (this.state.origin === 'landing') this.setState({notebookStage: false})
            }).then(() => {
                sessionStorage.getItem('token') === null ? this.setState({isLoggedin: false}) : this.setState({isLoggedin: true})
            })
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
    
     /**
     * NOTEBOOK CREATOR
     */

    inputTitle = e => this.setState({ notebooktitle: e.target.value})

    buildNotebook = e => {
        e.preventDefault()
        const { preurl, notebooktitle} = this.state
        
        const userId = sessionStorage.getItem('userId')
        const token = sessionStorage.getItem('token')

        return Promise.resolve()
        .then(() => {
            this.setState({url: preurl})
        })
        .then(() => {
            logic.createNotebook(userId, notebooktitle, preurl, token)
            .then(res => { this.setState({ notebook: res.notebookdId})})

        })
        .then(() =>{
            this.setState({ notebookStage: false})
            this.setState({ gotchaStage: true})
            this.setState({ origin: ''})
        })
    }        

    buildFakeNotebook = e => {
        e.preventDefault()
        const { preurl } = this.state
        return Promise.resolve()
        .then(() => {
            this.setState({url: preurl})
        })
        .then(() =>{
            this.setState({ notebookStage: false})
            this.setState({ gotchaStage: true})
            this.setState({ origin: 'landing_edition'})
        })
    }

    buildFakeNote = e => {
        e.preventDefault()
                
        const { gotchaSeconds, notetitle, notetext, notebook, fakenotes} = this.state
        
        return Promise.resolve()
            .then(() => {
                return fakenotes.push({gotchaSeconds, notetitle, notetext, notebook})
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

    /**
     * NOTES CREATOR
     */
    
    inputNoteTitle = e => this.setState({ notetitle: e.target.value})
    inputNoteText = e => this.setState({ notetext: e.target.value})
    
    buildNote = e => {
        e.preventDefault()
    
        const userId = sessionStorage.getItem('userId')
        const token = sessionStorage.getItem('token')
    
        const { gotchaSeconds, notetitle, notetext, notebook} = this.state
        
        return Promise.resolve()
            .then(() => {
                return logic.createNote(gotchaSeconds, notetitle, notetext, notebook, userId, token)
            })
            .then(() => this.child.method(userId, notebook) )
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
    

    /**
     * 
     * GO TO MOMENT
     * 
     */
    
    setSeekToPlay = (seconds) => {
        this.player.seekTo(seconds)
    }
    
    
    /**
     * 
     * VALIDATE YOUTUBE URL
     * 
     */

    validateUrl = e => {
        const seturl = e.target.value
        
        let fieldValidationErrors = this.state.formErrors;
        let urlValid = this.state.urlValid;
        
        
        urlValid = seturl.match(/^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})?$/)
        
        
        fieldValidationErrors.url = urlValid ? '' : 'invalid youtube url';
        this.setState({preurl: seturl})
        this.setState({formErrors: fieldValidationErrors,
            urlValid: urlValid}, this.validateForm)   
        }
        
    validateForm = () => this.setState({formValid: this.state.urlValid})

    secondsForm = (secs) => {
        return Math.floor(secs - (Math.floor(secs/60)) * 60)
    }
    
    minutesForm = (secs) => {
        return Math.floor(secs/60)
    }

    render () {

        const { url, gotchaSeconds, notebooktitle, fakenotes, isLoggedin } = this.state
        
        const notebookStage = this.state.notebookStage
        const gotchaStage = this.state.gotchaStage
        const noteStage = this.state.noteStage
        
        return(
            <div onKeyPress={this.onKeyPressed} tabIndex='0' className='editormain'>
                    <Row className={(gotchaStage) ? 'editor_headerrow-nocontent': 'editor_headerrow'} >
                    
                    {
                    (this.state.origin === "landing")
                    ? <div className='landing_header'>
                          <h4>This is a demo!</h4><br/>
                          <h4>if you want to save your notes you should be logged in ;)</h4><br/>
                          <Button outline color="success" onClick={this.buildFakeNotebook}>Create Demo Notebook</Button>
                    </div>
                    : <div></div>    
                    }
                    
                    {
                    (this.state.origin === "home")
                    ? <Button onClick={this.buildNotebook}>Start Notebook</Button>
                    : <div></div>    
                    }
                            
                    {
                    (notebookStage)
                    ?   <div id="notebookStage">
                        {
                        (!isLoggedin)
                        ?<InputGroup >
                            <Input type="text" name="url" placeholder='Paste a Youtube link' onChange={this.validateUrl} required/>
                            <InputGroupAddon addonType='append'>
                                <Button onClick={this.buildFakeNotebook} disabled={!this.state.formValid} >Submit</Button>
                            </InputGroupAddon>
                        </InputGroup>
                        :<InputGroup >
                            <Input type="text" name="notebooktitle" placeholder='Add a title' onChange={this.inputTitle} required/>
                            <Input type="text" name="url" placeholder='Paste a Youtube link' onChange={this.validateUrl} required/>
                            <InputGroupAddon addonType='append'>
                                <Button onClick={this.buildNotebook} disabled={!this.state.formValid} >Submit</Button>
                            </InputGroupAddon>
                        </InputGroup>
                        }
                            <div>
                                <FormErrors formErrors={this.state.formErrors} />
                            </div>
                        </div>
                    :<div></div>
                    }

                    </Row>

                    <Row className='editor_rowcontainer'>
                        <Col sm='6' className='editor_coleditor'>
                            <div className='appeditor'>
                                <div className='player-wrapper'>
                                    <ReactPlayer
                                        ref={this.ref}
                                        width='100%'
                                        height='100%'
                                        url={url}
                                        onProgress={this.onProgress}
                                        youtubeConfig={{ playerVars: { controls: 1 } }}
                                        />
                                </div>
                       

                                {
                                gotchaStage 
                                ?<div id="gotchaStage" className='gotchaStage'>
                                        <Button color="danger" onClick={this.gotcha}>GOTCHA!</Button>
                                </div>
                                :<div></div>
                                }
                            
                                {   
                                noteStage
                                ?<div  id="noteStage" className='noteStage'>
                                        <Form onSubmit={this.state.origin === "landing_edition" ? this.buildFakeNote : this.buildNote}>
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
                
                        <Col sm='1'></Col>
                   
                        <Col sm='5' className='editor_colsidebar'>
                            { (!gotchaStage) ?  null :  <h3>{notebooktitle}</h3> }
                            
                            <EditorNotesBar onRef={ref => (this.child = ref)} seektoPass={this.setSeekToPlay}/>

                            {
                            (this.state.origin === "landing_edition")
                            ?<div>
                                <div>
                                    {fakenotes.map(({ gotchaSeconds, notetext, notetitle}) => (
                                        <div>
                                            <Card className='notesCards'>    
                                                <FormGroup row>
                                                        <Col sm='2'></Col>
                                                        <Col sm='8'>
                                                        <Input className='inputCard' type="text" value={this.minutesForm(gotchaSeconds)+`:`+this.secondsForm(gotchaSeconds)} disabled/>
                                                        </Col>
                                                        <Col sm='2'></Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                        <Col sm='2'></Col>
                                                        <Col sm='8'>
                                                        <Input className='inputCard' type="text" name="notetitle" defaultValue={notetitle} onChange={this.onChangeNoteTitle} required disabled/>
                                                        </Col>
                                                        <Col sm='2'></Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                        <Col sm='2'></Col>
                                                        <Col sm='8'>
                                                        <Input className='inputCard' type="textarea" name="notetext" defaultValue={notetext} onChange={this.onChangeNoteText} disabled/>
                                                        </Col>
                                                        <Col sm='2'></Col>
                                                </FormGroup>
                                                        <div className='optionnotes'>
                                                            <Button sm={2} onClick={() => this.setSeekToPlay(gotchaSeconds)}>&#9654;</Button>
                                                        </div>
                                            </Card>    
                                        </div>
                                    ))}
                                </div>
                            </div>
                            :<div></div>    
                            }
                        </Col>
                    </Row>
            </div>      
         
        )
    }

}

export default withRouter(EditorPlayer)
