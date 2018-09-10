import React, {Component} from 'react';

//import {Container, ListGroup, ListGroupItem, Button, FormGroup, FormControl, ControlLabel} from 'reactstrap';
import ReactPlayer from 'react-player'
import PlayerNotesBar from './PlayerNotesBar';
import {logic} from '../logic'
import { withRouter } from 'react-router-dom'
import screenfull from 'screenfull'
import { findDOMNode } from 'react-dom'
import {FormGroup, Input, Button, Form, Label, Col, Card} from 'reactstrap'
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
            console.log(res)
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
            console.log(res)
            this.setState({ url : res.videourl})
            this.setState({ notebooktitle: res.notebooktitle})
            this.setState({ videoTitle: res.videotitle})
        })        
        .then( () => {
            console.log(this.state.seconds)
            this.setSeekToPlay(this.state.seconds)
        })
        .then(() => this.setState({noteId: noteid}))
        .then(this.setState({ loggedOut: token}))
   }

refresh = () => {
    const {userId, noteId } = this.state
    return logic.listNotesbyNoteId(userId, noteId)
    .then(res => {
        console.log(res)
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
        console.log(res)
        this.setState({ url : res.videourl})
        this.setState({ notebooktitle: res.notebooktitle})
        this.setState({ videoTitle: res.videotitle})
    })        
    .then( () => {
        console.log(this.state.seconds)
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
        console.log('onPlay')
        this.setState({ playing: true })
      }
      onPause = () => {
        console.log('onPause')
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
        console.log('onProgress', state)
        // We only want to update time slider if we are not currently seeking
        if (!this.state.seeking) {
          this.setState(state)
          //this.props.secondsPass(state)
        }
      }
      onEnded = () => {
        console.log('onEnded')
        this.setState({ playing: this.state.loop })
      }
      onDuration = (duration) => {
        console.log('onDuration', duration)
        this.setState({ duration })
      }

      onClickFullscreen = () => {
        console.log('onClickFullScrenn')
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
            
            console.log(userId, sessionuserid, noteId, newnotetitle, newnotetext, token)
            logic.updateNote(userId, sessionuserid, noteId, newnotetitle, newnotetext, token)
            .then(() => {this.setState({ edit: ''})})
            .then(() => {this.setState({ newnotetitle: ''})})
            .then(() => {this.setState({ newnotetext: ''})})
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

    //
    setSeekToPlay = (seconds) => {
        console.log(seconds)
        this.player.seekTo(seconds)
    }
    //
    
/////////////////////////////////////////

    render () 
        {
        const {items, notes} = this.state;
        const { url, playing, volume, muted, loop, playbackRate, gotchaSeconds, notebooktitle, fakenotes, noteId, seconds, notetitle, notetext, videoTitle, loggedOut } = this.state
        const urlToShare = window.location.href
        const SEPARATOR = ' · '
        
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
                            onReady={() => console.log('onReady')}
                            onStart={() => console.log('onStart')}
                            onPlay={this.onPlay}
                            onPause={this.onPause}
                            onBuffer={() => console.log('onBuffer')}
                            onSeek={e => console.log('onSeek', e)}
                            onEnded={this.onEnded}
                            onError={e => console.log('onError', e)}
                            onProgress={this.onProgress}
                            onDuration={this.onDuration}
                            youtubeConfig={{ playerVars: { controls: 1 } }}
                            />
                    </div>
                    <div>
                                    <Card className='NotesCards'>    
                                <FormGroup row>
                                        <Label sm={2}>Moment</Label>
                                        <Col sm={8}>
                                        <Input type="text" value={this.minutesForm(seconds)+`:`+this.secondsForm(seconds)} disabled/>
                                        </Col>
                                    </FormGroup>
                                    {
                                        (this.state.edit === noteId)
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
                                                <Input type="text" name='notetitle' value={notetitle} onChange={this.onChangeNoteTitle}  disabled required/>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label  sm={2}>Text</Label>
                                            <Col sm={8}>
                                                <Input type="textarea" name="notetext" value={notetext} onChange={this.onChangeNoteText} disabled/>
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
                                            <p>{videoTitle}</p>
                                        </Col>
                                        
                                        </FormGroup>
                                        <div className='optionnotes'>
                                        {
                                            (loggedOut)
                                            ?<div>
                                                {
                                                    (this.state.edit === noteId)
                                                    ? <Button sm={2} onClick={() => this.updateNoteForm(noteId)}>Save Changes&#128394;</Button>
                                                    : <Button onClick={() => this.setState({ edit: noteId})}>Edit&#128394;</Button>
                                                }
                                                    <Button sm={2} onClick={() => {this.deleteNote(noteId)}}>&#10799;</Button>
                                            </div>
                                            :<div></div>
                                        
                                        }
                                        

                                        <CopyToClipboard text={urlToShare}>
                                        <Button>Copy to Share Note Url</Button>
                                        </CopyToClipboard>
                                        
                                            
                                        </div>
                            </Card>
                                </div>
                </div>
                 
         
        )
    }

}

export default withRouter(NoteScreen)
