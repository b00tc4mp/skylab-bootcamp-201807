import React, { Component } from 'react'
import logic from '../logic'
import { withRouter } from 'react-router-dom'


class Files extends Component {

  render() {
    return (
        <div>
           <header>
            <h1 className="on">FILES</h1>
        </header>
        <main>
            <div className="screen">
                <nav>
                    > <a href="/profile">profile</a> <a href="/logout">logout</a> <span className="blink">_</span><img className="image" src="./default-image.png"/>
                </nav>
                <ul>
                    <li><a href="/download/file-1.txt">file-1.txt</a> <a href="/delete/file-1.txt">[x]</a></li>
                </ul>
                <div className="upload"> 
                    <button><label for="upload">Choose a file</label></button>
                    <form action="/files" method="post">
                        <input id="upload" type="file" name="upload" placeholder=""/>
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