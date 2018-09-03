import React, {Component} from 'react'
import {logic} from '../logic'

export default class Notebookcreator extends Component {

state = {
    videourl: '',
    notebooktitle: '',
    notebook: ''
}



inputVideoUrl = e => this.setState({ videourl: e.target.value})
inputTitle = e => this.setState({ notebooktitle: e.target.value})


buildNotebook = e => {
    e.preventDefault()

    const userId = sessionStorage.getItem('userId')
    const token = sessionStorage.getItem('token')

    const { videourl, notebooktitle} = this.state
    
    this.props.urlPass(videourl)
    
    return Promise.resolve()
    .then(() => {
        logic.createNotebook(userId, notebooktitle, videourl, token)
        .then(res => { this.setState({ notebook: res.notebookdId})
        //console.log(res.notebookdId)})
        this.passProp(res.notebookdId)})
    })
    //.then(() => {this.passProp()})
        
    
}

passProp = (id) =>{
    this.props.NotebookIdPass(id)
    console.log('passed!', id)
}

render () {
    return (
        <form onSubmit={this.buildNotebook}>
            <input type="text" name="videourl" placeholder="www.youtube.com/..." onChange={this.inputVideoUrl} />
            <input type="text" name="notebooktitle" placeholder="Notebook Title" onChange={this.inputTitle} />
            <button type="submit">Submit</button>
        </form>
    )
}


}