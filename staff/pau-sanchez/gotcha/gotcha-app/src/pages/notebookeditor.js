import React, {Component} from 'react'
import EditorPlayer from '../components/EditorPlayer'
import Navbar from '../components/Navbar'


export default class NotebookEditor extends Component {
    
   
    render() {
 
        return (
            <div>
                <Navbar />
                
                
                <EditorPlayer />
                

            </div>
        )
    }
}

