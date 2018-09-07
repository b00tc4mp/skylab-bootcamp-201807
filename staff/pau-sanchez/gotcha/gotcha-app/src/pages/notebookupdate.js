
import React, {Component} from 'react'
import UpdateNotebook from '../components/UpdateNotebook'
import Navbar from '../components/Navbar'


export default class NotebookUpdate extends Component {
    
   
    render() {
 
        return (
            <div>
                <Navbar />
                <h1>NOTEBOOK UPDATE</h1>
                
                <UpdateNotebook />
                

            </div>
        )
    }
}