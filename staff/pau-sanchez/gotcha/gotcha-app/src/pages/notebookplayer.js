import React, {Component} from 'react'
import NotebookScreen from '../components/NotebookScreen'
import Navbar from '../components/Navbar'

export default class NotebookPlayer extends Component {
    
   
    render() {
 
        return (
            <div>
                <Navbar />
                <h1>NOTEBOOK PLAYER</h1>
                
                <NotebookScreen />
                

            </div>
        )
    }
}