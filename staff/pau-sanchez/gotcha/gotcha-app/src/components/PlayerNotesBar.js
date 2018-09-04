import React from 'react'
import {logic} from '../logic'



class PlayerNotesBar extends React.Component {

    

    state = {
        notes : [],
        userId: '',
        notebookid: '',
        newnotetitle: '',
        newnotetext: ''
        
    }
    
    componentDidMount() {
        this.props.onRef(this)
      }
      componentWillUnmount() {
        this.props.onRef(null)
      }
      
      method(userId, notebookid) {
        console.log('do stuff')
        this.setState({userId : userId})
        this.setState({ notebookid: notebookid})
        return Promise.resolve()
            .then(() => {
                logic.listNotebyNotebookId(userId, notebookid)
                .then(res => {
                console.log(res)
                this.setState({notes: res})
                })
            
            })
    }

    refreshList = () => {
        const {userId, notebookid} = this.state
        logic.listNotebyNotebookId(userId, notebookid)
        .then(res => {
            this.setState({notes: res})
        })
    }

    deleteNote(noteid) {
        const {userId} = this.state
        const token = sessionStorage.getItem('token')
        const sessionuserid = sessionStorage.getItem('userId')
        logic.removeNote(userId, sessionuserid, noteid, token)
        .then(() => {
            return this.refreshList()
        })
    }
    

    updateNoteForm = (_id) =>{
    const {userId, newnotetitle, newnotetext } = this.state
        const token = sessionStorage.getItem('token')
        const sessionuserid = sessionStorage.getItem('userId')
        //const noteIdtoEdit = sessionStorage.getItem('noteIdtoEdit')
        console.log(_id)
        logic.updateNote(userId, sessionuserid, _id, newnotetitle, newnotetext, token)
        .then(() => {
            return this.refreshList()
        })
    }

    //idState = (_id) => this.setState({noteIdtoEdit : _id})
    //idState = (_id) => sessionStorage.setItem('noteIdtoEdit', _id)

    onChangeNoteTitle = e => this.setState({ newnotetitle: e.target.value})
    onChangeNoteText = e => this.setState({ newnotetext: e.target.value})

    
    


      render() {
                        const {notes} = this.state
        return <div>
            <h1>Notes</h1>
            <div>
                   
                        {notes.map(({ notetext, notetitle, seconds, _id }) => (
                            
                                <div>
                               <span>Title: {notetitle}  </span> 
                                <span>Text: {notetext}  </span>
                                <span>Time: {Math.floor(seconds/60)}:{Math.floor(seconds - (Math.floor(seconds/60)) * 60)}  </span>
                                <button
                                 className="remove-btn"
                                 color="danger"
                                 size="sm"
                                 onClick={() => this.props.seektoPass(seconds)}
                                 >SeekTo</button>
                                </div>
                            
                        ))}
                    
                </div>
            </div>
      }
    }
    

export default PlayerNotesBar;