import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'
import { saveAs } from 'file-saver/FileSaver';


class Files extends Component {

    state = {
        files: [],
        file: null
    }

    keepFile = event => this.setState({file:event.target.files[0]})

    componentDidMount(){
        this.getFilesState()
    }

    remove = (event) =>{
        event.preventDefault()
        
        this.props.onRemove(this.props.username, event.target.name )
            .then(() => this.getFilesState())
    }

    getFilesState = () => {
        this.props.listFiles(this.props.username)
            .then(res => {
                this.setState({
                    files: res
                })
            })
    }

    onUpload = (event) =>{
        event.preventDefault()
        const { file } = this.state
        const { username } = this.props
        this.props.onUpload(username,file)
            .then(()=>{
                this.setState({
                    file:null
                })
                this.getFilesState()
            })
    }

    handleDownload = (e) => {
        // (this.props.username, event.target.name)
        e.preventDefault()
        
    }
    
  render() {
    return (
        <div>   
           <header>
            <h1 className="on">FILES</h1>
        </header>
        <main>
            <div className="screen">
                <nav>
                </nav>
                <ul>
                    {
                        this.state.files.map(item => <li key={item}><a href="#" name={item} onClick={this.handleDownload}>{item}</a><a name={item} href="" onClick={this.remove}>[Delete]</a></li>)
                    }
                </ul>
                <div className="upload"> 
                    <button><label htmlFor="upload">Choose a file</label></button>
                    <form onSubmit={(e) => {this.onUpload(e)}} action="/files" method="post">
                        <input id="upload" type="file" name="upload" placeholder="" onChange={this.keepFile}/>
                        <button type="submit" /*onClick={this.onUpload}*/>upload</button>
                    </form>
                 </div> 
            </div>
        </main>
        <footer>
            <span className="power on">&#x23FB;</span>
        </footer>
        </div>
    )
  }
}

export default withRouter(Files)