import React, {Component} from 'react'
import ListingNotes from '../components/ListingNotes'
import Navbar from '../components/Navbars'

export default class Listnotes extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <ListingNotes />
            </div>
        )
    }
}