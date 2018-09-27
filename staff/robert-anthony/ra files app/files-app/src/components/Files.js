import React, {Component} from 'react';
import logic from '../logic'
import PropTypes from 'prop-types';
import FileSaver from 'file-saver/FileSaver';


import {Link} from 'react-router-dom'


export default class Files extends Component {

  static propTypes = {
    username: PropTypes.string
  }

  state = {
    fileError: null,
    files: []
  }

  blobby = (stream) => {
    const reader = stream.getReader();
    return new ReadableStream({
      start(controller) {
        return pump();
        function pump() {
          return reader.read().then(({ done, value }) => {
            // When no more data needs to be consumed, close the stream
            if (done) {
              controller.close();
              return;
            }
            // Enqueue the next data chunk into our target stream
            controller.enqueue(value);
            return pump();
          });
        }
      }
    })

  }

  uploadFile = (e) => {
    console.log(this)
    e.preventDefault()
    logic.saveFile(this.props.username, this.uploadInput.files[0])
      .then(() => this.retrieveFiles(), (err) => console.log(err))
      .catch(err => this.setState({fileError: err.message}))
  }

  retrieveFiles = () => {
    logic.listFiles(this.props.username)
      .then(res => {
        this.setState({files: res, filesError: null})
      })
      .catch(err => this.setState({files: null, fileError: err}))
  }

  handleClick = (fileName) => {

    logic.retrieveFile(this.props.username, fileName)
     // .then(this.blobby)
      .then(stream => new Response(stream))
      .then(response => response.blob())

      .then(blob => FileSaver.saveAs(blob,fileName))

      .catch((err) => this.setState({fileError: err}), (err) => console.log(err))
  }

  handleDeleteClick = (fileName) => {

    logic.removeFile(this.props.username, fileName)
      .then(() => this.retrieveFiles(), err => console.log(err))
      .catch((err) => this.setState({fileError: err}))
  }

  componentDidMount() {
    this.retrieveFiles()
  }

  render() {
    const {state: {files, fileError}} = this

    return <div>
      {(files && files.length > 0) && files.map((file, i) => <li className="fileLi" key={`${file}${i}`}><a
        onClick={(e) => {
          e.preventDefault();
          this.handleClick(file)
        }} href="#">{file}</a><a href="#" onClick={(e) => {
        e.preventDefault();
        this.handleDeleteClick(file)
      }}>[X]</a></li>)}

      <button><label htmlFor="upload">Choose a file</label></button>
      <form onSubmit={this.uploadFile}>
        <input id="upload" ref={(ref) => {
          this.uploadInput = ref;
        }} type="file" name="upload" placeholder="" autoFocus/>
        <button type="submit">upload</button>
      </form>
      {fileError && <h3>{fileError.toString()}</h3>}
    </div>
  }


}

