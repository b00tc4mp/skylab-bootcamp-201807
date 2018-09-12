import React, {Component} from 'react';
import ReactPlayer from 'react-player'
import {logic} from '../logic'
import { withRouter } from 'react-router-dom'
import screenfull from 'screenfull'
import { findDOMNode } from 'react-dom'
import {FormGroup, Input, Button, Label, Col, Row} from 'reactstrap'
import { CopyToClipboard } from 'react-copy-to-clipboard' 


class NoteScreen extends Component {

    state = {
        userId: '',
        seconds: '',
        notetitle: '',
        notetext: '',
        notebook: '',
        //////////
        items: [
            
        ],
        notes:[],
        fakenotes:[],
        url: null ,
        preurl: null,
        //////////////////////
        videoSlugId: '',
        playing: true,
        volume: 0.8,
        muted: false,
        played: 0,
        loaded: 0,
        duration: 0,
        playbackRate: 1.0,
        loop: false,
        /////////////////////
        newnotetitle: '',
        newnotetext: '',
        newNoteSeconds: '',
        videoTitle:'',
        noteBookId: '',
        noteId: '',
        /////////////////////
        isLoggedin: false,
        gotchaSeconds: '',
        ////////////////////
        notebookStage: true, /*IF TRUE Display only notebook title & url form// IF FALSE Hide form*/
        gotchaStage: false, /*IF TRUE Display gotcha button//IF FALSE Hide Button*/
        noteStage: false, /*IF TRUE Display note form//IF FALSE Hide form notes*/
        /////////////////
        formErrors: {url: ''},
        urlValid: false,
        formValid: false,
        /////////////
        notebooktitle: '',
        homeNotebookTitle: '',
        landingNotebookTitle: '',
        /////ORIGIN///////
        origin: '',
        loggedOut: '',


    }

    componentDidMount() {
        const {editor, noteid} = this.props.match.params
        const token = sessionStorage.getItem('token')
        
        return logic.listNotesbyNoteId(editor, noteid)
        .then(res => {
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
        .then( () => {
            this.setSeekToPlay(this.state.seconds)
        })
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
      playPause = () => {
        this.setState({ playing: !this.state.playing })
      }
      stop = () => {
        this.setState({ url: null, playing: false })
      }
      toggleLoop = () => {
        this.setState({ loop: !this.state.loop })
      }
      setVolume = e => {
        this.setState({ volume: parseFloat(e.target.value) })
      }
      toggleMuted = () => {
        this.setState({ muted: !this.state.muted })
      }
      setPlaybackRate = e => {
        this.setState({ playbackRate: parseFloat(e.target.value) })
      }
      onPlay = () => {
        this.setState({ playing: true })
      }
      onPause = () => {
        this.setState({ playing: false })
      }
      onSeekMouseDown = e => {
        this.setState({ seeking: true })
      }
      onSeekChange = e => {
        this.setState({ played: parseFloat(e.target.value) })
      }
      onSeekMouseUp = e => {
        this.setState({ seeking: false })
        this.player.seekTo(parseFloat(e.target.value))
      }
      onProgress = state => {
        if (!this.state.seeking) {
          this.setState(state)
          
        }
      }
      onEnded = () => {
        this.setState({ playing: this.state.loop })
      }
      onDuration = (duration) => {
        this.setState({ duration })
      }

      onClickFullscreen = () => {
        screenfull.request(findDOMNode(this.player))
      }
      
      renderLoadButton = (url, label) => {
        return (
          <button onClick={() => this.load(url)}>
            {label}
          </button>
        )
      }
      ref = player => {
        this.player = player
      }
    
    /////////////////////////////////////////
   
    /////////NOTES UPDATE///////////////

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
    
        /*
        editable = e => {
            e.preventDefault()
            console.log(e.target.name)
        }
        */
            
        
    ////////////////////////////////////////////////
        
    
        
    

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


///////////////////////////////////////////

    
    setSeekToPlay = (seconds) => {
        this.player.seekTo(seconds)
    }
    
    
/////////////////////////////////////////

    render () 
        {
        const { url, playing, volume, muted, loop, playbackRate, notebooktitle, noteId, seconds, notetitle, notetext, videoTitle, loggedOut } = this.state
        const urlToShare = window.location.href
        
        return(
            <div className='center-note-player'>
                    <div className='player-wrapper-note'>
                        <ReactPlayer
                            ref={this.ref}
                            width='100%'
                            height='100%'
                            url={url}
                            playing={playing}
                            loop={loop}
                            playbackRate={playbackRate}
                            volume={volume}
                            muted={muted}
                            //onReady={() => console.log('onReady')}
                            //onStart={() => console.log('onStart')}
                            onPlay={this.onPlay}
                            onPause={this.onPause}
                            //onBuffer={() => console.log('onBuffer')}
                            //onSeek={e => console.log('onSeek', e)}
                            onEnded={this.onEnded}
                            //onError={e => console.log('onError', e)}
                            onProgress={this.onProgress}
                            onDuration={this.onDuration}
                            youtubeConfig={{ playerVars: { controls: 1 } }}
                            />
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
                                            
                                    
                                        
                                        
                                        
