import React, {Component} from 'react'
import NotebookScreen from '../components/NotebookScreen'
import Navbar from '../components/Navbars'

class NotebookPlayer extends Component {
    
    render() {
 
        return (
            <div>
                <Navbar />
                <NotebookScreen />
            </div>
        )
    }
}

export default NotebookPlayer