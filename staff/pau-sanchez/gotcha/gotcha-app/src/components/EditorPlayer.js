import React, {Component} from 'react';
//import {Container, ListGroup, ListGroupItem, Button, FormGroup, FormControl, ControlLabel} from 'reactstrap';
import ReactPlayer from 'react-player'
import EditorNotesBar from './EditorNotesBar';
import {logic} from '../logic'
import { withRouter } from 'react-router-dom'
import screenfull from 'screenfull'
import { findDOMNode } from 'react-dom'
import FormErrors from './formerrors'



class EditorPlayer extends Component {
    state = {
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
        newNoteTitle: '',
        newNoteText: '',
        newNoteSeconds: '',
        videoTitle:'',
        noteBookId: '',
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
        origin: ''


    }
    
    componentDidMount () {
        
        const url = sessionStorage.getItem('landingUrl') || sessionStorage.getItem('homeUrl')
        const notebooktitle = sessionStorage.getItem('landingNotebookTitle') || sessionStorage.getItem('homeNotebookTitle')
        const origin = sessionStorage.getItem('origin')
        
        return Promise.resolve()
            .then(() => {

                //this.setState({ url : url})
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
      onClickFullscreen = () => {
        console.log('onClickFullScrenn')
        screenfull.request(findDOMNode(this.player))
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
    /////////NOTEBOOK CREATOR///////////////

    //inputVideoUrl = e => this.setState({ preurl: e.target.value})
    inputTitle = e => this.setState({ notebooktitle: e.target.value})


    buildNotebook = e => {
        console.log('buildNotebook')
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
            console.log('hi')
            this.setState({ notebookStage: false})
            this.setState({ gotchaStage: true})
            this.setState({ origin: ''})
        })
    }        

    /////////////////////////////////////////

    buildFakeNotebook = e => {
        e.preventDefault()
        const { preurl, notebooktitle} = this.state
        return Promise.resolve()
        .then(() => {
            this.setState({url: preurl})
        })
        .then(() =>{
            console.log('hi')
            this.setState({ notebookStage: false})
            this.setState({ gotchaStage: true})
            //this.setState({ origin: ''})
        })
    }

    buildFakeNote = e => {
        e.preventDefault()
        console.log('buildFakeNote')
        
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
    /////////NOTES CREATOR///////////////

    
    
      
    
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


///////////////////////////////////////////

    //
    setSeekToPlay = (seconds) => {
        this.player.seekTo(seconds)
    }
    //
    
////////////VALIDATE YOUTUBE URL//////////////////

validateUrl = e => {
    const seturl = e.target.value
    
    let fieldValidationErrors = this.state.formErrors;
    let urlValid = this.state.urlValid;
    
    
    urlValid = seturl.match(/^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})?$/)
    console.log(urlValid)
    
    fieldValidationErrors.url = urlValid ? '' : 'invalid youtube url';
    this.setState({preurl: seturl})
    this.setState({formErrors: fieldValidationErrors,
            urlValid: urlValid}, this.validateForm)   
    }

validateForm = () => this.setState({formValid: this.state.urlValid})


/////////////////////////////////////////

    render () 
        {
        const { url, playing, volume, muted, loop, playbackRate, gotchaSeconds, notebooktitle, fakenotes } = this.state
        
        const notebookStage = this.state.notebookStage
        const gotchaStage = this.state.gotchaStage
        const noteStage = this.state.noteStage

        const SEPARATOR = ' · '
        
        return(
            <div>
                {
                        (this.state.origin == "landing")
                        ? <div>
                          <h1>This is a demo, if you want to save your notes you should be logged in ;)</h1>
                          </div>
                        : <div></div>    
                        
                    }
                <div className='app'>
                    <section className='section'>
           
                        <div className='player-wrapper'>
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
                       
                    </section>
                    <section className='section'>
                       
                    <h1>{notebooktitle}</h1>

                    {
                        (this.state.origin === "home")
                        ? <button onClick={this.buildNotebook}>Start HomeNotebook</button>
                        : <div></div>    
                        
                    }

                    {
                        (this.state.origin === "landing")
                        ? <button onClick={this.buildFakeNotebook}>Start FakeNotebook</button>
                        : <div></div>    
                        
                    }
                    
                    {
                        (notebookStage)
                        ?   <div id="notebookStage">
                                <form onSubmit={this.buildNotebook}>
                                    <input type="text" name="url" placeholder="www.youtube.com/..." onChange={this.validateUrl} />
                                    <input type="text" name="notebooktitle" placeholder="Notebook Title" onChange={this.inputTitle} required/>
                                    <button type="submit" disabled={!this.state.formValid}>Submit</button>
                                </form>
                                <div>
                                    <FormErrors formErrors={this.state.formErrors} />
                                </div>
                            </div>
                        : <div></div>
                    }
                    
                    

                    {
                        gotchaStage 
                        ?   <div id="gotchaStage">
                                <button onClick={this.gotcha}>GOTCHA!</button>
                            </div>
                        : <div></div>

                    }
                    
                    {
                        noteStage
                        ?   <div  id="noteStage">
                                <p>{gotchaSeconds}</p>
                                {/*<form onSubmit={this.state.origin === "landing" ? this.buildFakeNote : this.buildNote}>*/}
                                <form onSubmit={this.buildFakeNote}>
                                    <input type="text" name="notetitle" placeholder="notetitle" onChange={this.inputNoteTitle} required/>
                                    <input type="text" name="notetext" placeholder="notext" onChange={this.inputNoteText} />
                                    <button type="submit">Submit</button>
                                </form>
                            </div>
                        : <div></div>
                    }


                    

                    <EditorNotesBar onRef={ref => (this.child = ref)} seektoPass={this.setSeekToPlay}/>

                    {(this.state.origin === "landing")
                        ? <div>
                                <h1>FakeNotes</h1>
                                    <div>
                   
                                        {fakenotes.map(({ gotchaSeconds, notetext, notetitle}) => (
                                            
                                                <div>
                                            <span>Title: {notetitle}  </span> 
                                                <span>Text: {notetext}  </span>
                                                <span>Time: {Math.floor(gotchaSeconds/60)}:{Math.floor(gotchaSeconds - (Math.floor(gotchaSeconds/60)) * 60)}  </span>
                                                <button
                                                className="remove-btn"
                                                color="danger"
                                                size="sm"
                                                onClick={() => this.setSeekToPlay(gotchaSeconds)}
                                                >SeekTo</button>
                                                </div>
                                            
                                        ))}
                    
                                    </div>
                            </div>
                        :<div></div>    
                    }

                    </section>
          
                </div>
            </div>      
         
        )
    }

}

export default withRouter(EditorPlayer)
