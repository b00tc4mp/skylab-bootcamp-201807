import React from 'react'
import {withRouter} from 'react-router-dom'

function Home({ list }){
    return <div>
        <ul>
        {list.map((item) => <li>{item}</li>)}
        </ul>
        <div className="upload"> 
        <button><label htmlFor="upload">Choose a file</label></button>
        <form action="/files" method="post">
            <input id="upload" type="file" name="upload" placeholder=""/>
            <button type="submit">upload</button>
        </form>
     </div> 
     </div>
        
}

export default withRouter(Home)