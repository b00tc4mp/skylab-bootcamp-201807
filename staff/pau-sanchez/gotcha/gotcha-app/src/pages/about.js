import React, {Component} from 'react'
import Navbar from '../components/Navbar'

export default class About extends Component {

    onLogout = e => {
        e.preventDefault()
        this.setState({ userId: '', token: '' })
        sessionStorage.clear()
      }

    render() {
        return (
            <div>
                <Navbar />
                <h1>ABOUT</h1>
            </div>
        )
    }
}