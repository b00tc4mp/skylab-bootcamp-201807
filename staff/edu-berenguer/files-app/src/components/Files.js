import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'


class Files extends Component {

    state = {
        selectedFile:'',
        files: []
    }

    componentDidMount(){
        this.setState({
            files:this.props.listFiles
        })
    } 
    
    keepFile = (event) =>(this.setState={selectedFile: event.target.files})

    saveFile = (event) =>{
        event.preventDefault()
        const { selectedFile } = this.state
        this.props.uploadFile(selectedFile)
       
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
                    {/* > <a href="/profile">profile</a> <a href="/logout">logout</a> <span className="blink">_</span><img className="image" src="./default-image.png"/> */}
                </nav>
                <ul>
                    {
                        this.state.files.map(item => <li key={item}>{item}<a href="" onClick={(event) => {event.preventDefault(); this.props.onRemove(item)}}>[x]</a></li>)
                    }
                    {/* <li><a href="/download/file-1.txt">file-1.txt</a> <a href="/delete/file-1.txt">[x]</a></li> */}
                </ul>
                <div className="upload"> 
                    <button><label htmlFor="upload">Choose a file</label></button>
                    <form onSubmit={this.saveFile}>
                        <input id="upload" type="file" name="upload" placeholder="" onChange={this.keepFile}/>
                        <button type="submit">upload</button>
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