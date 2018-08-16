import React, { Component } from 'react'
import logic from '../logic'

class Main extends Component {

  state = { file: undefined, files: [] }

    componentDidMount() {
        this.listFiles()
            .catch(({ message }) => alert(message))
    }

    listFiles() {
        return logic.listFiles(this.props.username)
            .then(files => this.setState({ files }))
    }

    onFileChanged = event => this.setState({ file: event.target.files[0] })

    onUpload = event => {
        event.preventDefault()
        logic.saveFile(this.props.username, this.state.file)
            .then(() => this.listFiles())
            .catch(({ message }) => alert(message))
    }

    onDownload = event => {
        event.preventDefault()
        const file = event.target.dataset.file
        logic.retrieveFile(this.props.username, file)
            .then(stream => new Response(stream).blob())
            // .then(blob => fileSaver.saveAs(blob, file))
            .catch(({ message }) => alert(message))
    }

    onDelete = event => {
        event.preventDefault()
        const file = event.target.dataset.file
        logic.removeFile(this.props.username, file)
            .then(() => this.listFiles())
            .catch(({ message }) => alert(message))
    }

    render() {
        const { files } = this.state

        return <div>
                <nav>
                  &gt; <a href="">profile</a> <a href="">logout</a> <span className="blink">_</span>
                </nav>
                {(!!files.length) && <ul>
                  {files.map(file => <li><a href="" onClick={this.onDownload} data-file={file}>{file}</a> <a href="" onClick={this.onDelete} data-file={file}>[x]</a> </li> )}
                </ul>}
                <button>
                  <label htmlFor="upload">Choose a file</label>
                </button>
                <form onSubmit={this.onUpload}>
                  <input id="upload" type="file" name="upload" placeholder autoFocus onChange={this.onFileChanged} />
                  <button type="submit">upload</button>
                </form>
            </div>
    
    }
}

export default Main