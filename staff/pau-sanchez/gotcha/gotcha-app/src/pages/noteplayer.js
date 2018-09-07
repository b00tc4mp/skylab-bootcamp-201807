import React, {Component} from 'react'
import NoteScreen from '../components/NoteScreen'
import Navbar from '../components/Navbar'

export default class Noteplayer extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <h1>Note Player</h1>
                < NoteScreen />
            </div>
        )
    }
}