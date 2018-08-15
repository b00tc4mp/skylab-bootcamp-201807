import React, { Component } from 'react'
import logic from '../logic'
import fileSaver from 'file-saver'

class Files extends Component {
    state = { file: undefined, files: [] }

    componentDidMount() {
        this.listFiles()
            .catch(({ message }) => alert(message))
    }

    listFiles() {
        return logic.listFiles(this.props.username)
            .then(files => this.setState({ files }))
    }

    onFileChanged = e => this.setState({ file: e.target.files[0] })

    onUpload = e => {
        e.preventDefault()

        logic.saveFile(this.props.username, this.state.file)
            .then(() => this.listFiles())
            .catch(({ message }) => alert(message))
    }

    onDownload = e => {
        e.preventDefault()

        const file = e.target.dataset.file

        logic.retrieveFile(this.props.username, file)
            .then(stream => new Response(stream).blob())
            .then(blob => fileSaver.saveAs(blob, file))
            .catch(({ message }) => alert(message))
    }

    onDelete = e => {
        e.preventDefault()

        const file = e.target.dataset.file

        logic.removeFile(this.props.username, file)
            .then(() => this.listFiles())
            .catch(({ message }) => alert(message))
    }

    render() {
        const { files } = this.state

        return <main>
            <div className="screen">
                <nav>
                    &gt; <a href="/profile">profile</a> <a href="/logout">logout</a> <span className="blink">_</span>
                    <img className="image" src="./default-image.png" alt="" />
                </nav>
                {
                    (!!files.length) && <ul>
                        {
                            files.map(file =>
                                <li>
                                    <a href="" onClick={this.onDownload} data-file={file}>{file}</a> <a href="" onClick={this.onDelete} data-file={file}>[x]</a>
                                </li>
                            )
                        }
                    </ul>
                }
                <button>
                    <label htmlFor="upload">Choose a file</label>
                </button>
                <form onSubmit={this.onUpload}>
                    <input id="upload" type="file" name="upload" placeholder autofocus onChange={this.onFileChanged} />
                    <button type="submit">upload</button>
                </form>
            </div>
        </main>
    }
}

export default Files