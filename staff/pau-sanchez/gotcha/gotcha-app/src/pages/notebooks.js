import React, {Component} from 'react'
import { withRouter, Link } from 'react-router-dom'
import {logic} from '../logic'

class Notebooks extends Component {
    
    state = {
        notebooks: []
    }

    componentDidMount() {
        this.getNotebooks()
    }

    getNotebooks = () => {
        const sessionuserid = sessionStorage.getItem('userId')
        const token = sessionStorage.getItem('token')
        logic.listNotebooks(sessionuserid, token)
        .then(res => {
            console.log(res)
            this.setState({notebooks:res})
        })
    }

    deleteNotebooks = (notebookid, userId) => {
        const sessionuserid = sessionStorage.getItem('userId')
        const token = sessionStorage.getItem('token')
        return Promise.resolve()
            .then(() => {
                logic.removeNotebook(userId, sessionuserid, notebookid, token)
            })
            .then(()=> this.getNotebooks())
    }

    
 



    render() {
        const {notebooks} = this.state
        return (
            <div>
                <h1>NOTEBOOKS</h1>

                {notebooks.map(({ date, notebooktitle, user, videoid, videothumbnail, videotitle, videourl, _id }) => {

                   return <div>
                        <span>Date {date}</span>
                        <span>notebooktitle {notebooktitle}</span>
                        <span>user {user}</span>
                        <span>videoid {videoid}</span>
                        <span>videothumbnail {videothumbnail}</span>
                        <span>videotitle {videotitle}</span>
                        <span>videourl {videourl}</span>
                        <Link to={`/player/${_id}/${user}`}>Play Notebook</Link>
                        <Link to={`/editnotebook/${_id}/${user}`}>Edit Notebook</Link>
                        
                        {/*<button onClick={this.deleteNotebooks(_id, user)}>Delete Notebook</button>*/}
                    </div>

                }


        )}

            </div>
        )
    }
}

export default withRouter(Notebooks)

