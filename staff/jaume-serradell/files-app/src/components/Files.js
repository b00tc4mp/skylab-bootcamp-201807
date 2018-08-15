import React, { Component } from 'react';

class Files extends Component {
    render() {
        return <div className="screen">
            <h1>FILES</h1> <img className="image" src="images/default-image.png" />
            <nav>
                > <a href="/profile">profile</a> <a href="/logout">logout</a> <span className="blink">_</span>
            </nav>
            <ul>
                <li>file 1</li>
                <li>file 2</li>
                <li>file 3</li>
            </ul>
            <button><label for="upload">Choose a file</label></button>
            <form action="/files" method="post">
                <input id="upload" type="file" name="upload" placeholder="" autofocus />
                <button type="submit">upload</button>
            </form>
        </div>
    }
}

export default Files