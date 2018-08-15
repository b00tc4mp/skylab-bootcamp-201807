import React, { Component } from 'react'

class Files extends Component {
    render() {
        return <main>
            <div className="screen">
                <nav>
                    &gt; <a href="/profile">profile</a> <a href="/logout">logout</a> <span className="blink">_</span>
                    <img className="image" src="./default-image.png" alt="" />
                </nav>
                <ul>
                    <li>
                        <a href="/download/file-1.txt">file-1.txt</a> <a href="/delete/file-1.txt">[x]</a>
                    </li>
                </ul>
                <button>
                    <label htmlFor="upload">Choose a file</label>
                </button>
                <form action="/files" method="post">
                    <input id="upload" type="file" name="upload" placeholder autofocus />
                    <button type="submit">upload</button>
                </form>
            </div>
        </main>
    }
}

export default Files