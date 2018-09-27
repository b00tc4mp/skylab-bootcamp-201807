import React, {Component} from 'react'
import EditorPlayer from '../components/EditorPlayer'
import Navbars from '../components/Navbars'

class NotebookEditorLanding extends Component {
   
    render() {
 
        return (
            <div>
                <Navbars />
                <EditorPlayer />
            </div>
        )
    }
}

export default NotebookEditorLanding

