import React, { Component } from 'react'
import logic from '../logic'

class Main extends Component {

  state = { 
    username : logic.username,
    file: ''
  }

  listFiles = () => {
    logic.listFiles(this.state.username)
      return <li></li>
  }

  downloadFiles = () => {
    logic.retrieveFile(this.state.username, this.state.file)
      .then((event) => {
        event.preventDefault()
        this.props.history.push('/home')
      })
  }

  deleteFiles = () => {
    logic.removeFile(this.state.username, this.state.file)
      .then((event) => {
        event.preventDefault()
        this.props.history.push('/home')
      })
  }

  
  render() {

    return <section className="main">
              <header>
                <h1>FILES</h1>
              </header>
                <div>
                    <nav>
                        > <a href="">profile</a> <a href="">logout</a> <span className="blink">_</span>
                    </nav>
                    <ul>
                        <li><a href="/home" onClick={this.downloadFiles}></a> <a onClick={this.deleteFiles} href="/home">[x]</a></li>
                    </ul>
                    <div className="upload">
                        <button><label for="upload">Choose a file</label></button>
                        <form action="/files" method="post">
                            <input id="upload" type="file" name="upload" placeholder=""/>
                            <button type="submit">upload</button>
                        </form>
                    </div>
                </div>
             </section>
  }
}

export default Main