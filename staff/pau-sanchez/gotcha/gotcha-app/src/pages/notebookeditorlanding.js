import React, {Component} from 'react'
import EditorPlayer from '../components/EditorPlayer'
import Navbars from '../components/Navbar'


export default class NotebookEditorLanding extends Component {
    
   
    render() {
 
        return (
            <div>
                <Navbars />
                <h1>DEMO NOTEBOOK EDITOR</h1>
                
                <EditorPlayer />
                

            </div>
        )
    }
}

