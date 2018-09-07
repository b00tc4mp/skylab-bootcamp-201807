import React, {Component} from 'react'
import ListingNotes from '../components/ListingNotes'
import Navbar from '../components/Navbar'

export default class Listnotes extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <h1>LIST NOTES</h1>
                < ListingNotes />
            </div>
        )
    }
}