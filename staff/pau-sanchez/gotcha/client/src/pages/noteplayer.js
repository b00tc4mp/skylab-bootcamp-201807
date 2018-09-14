import React, {Component} from 'react'
import NoteScreen from '../components/NoteScreen'
import Navbar from '../components/Navbars'

class Noteplayer extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <NoteScreen />
            </div>
        )
    }
}

export default Noteplayer