import React from 'react'
import './Files.css'

const Files = () => {
    return (
        <main>
        <div class="screen">
            <nav>
                > <a href="/profile">profile</a> 
                <a href="/logout">logout</a> 
                <span class="blink">_</span>
                <img class="image" src="./images/default-image.png"/>
            </nav>
            <ul>
                <li><a href="/download/file-1.txt">file-1.txt</a> <a href="/delete/file-1.txt">[x]</a></li>
            </ul>
   
                <button><label for="upload">Choose a file</label></button>
                <form action="/files" method="post">
                    <input id="upload" type="file" name="upload" placeholder="" autofocus/>
                    <button type="submit">upload</button>
                </form>
         
        </div>
    </main>
    )
}

export default Files