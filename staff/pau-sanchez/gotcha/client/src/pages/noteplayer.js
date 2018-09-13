import React, {Component} from 'react'
import NoteScreen from '../components/NoteScreen'
import Navbar from '../components/Navbars'

export default class Noteplayer extends Component {
    render() {
        return (
            <div>
                <Navbar />
                
                < NoteScreen />
            </div>
        )
    }
}