import React, { Component } from 'react'
import './Myzone.css'
import Upload from './pages/Upload'
import Sidebar from './sections/Sidebar'
import Profile from './pages/Profile'
import Mylist from './pages/Mylist'
import Favourites from './pages/Favourites'
import Reviews from './pages/Reviews'
import logic from '../logic'

import { Route, withRouter } from 'react-router-dom'

class Myzone extends Component {

    state = {
    }

    render() {

        const { onLogout, onProductUpload } = this.props

        return (
            <div>
                <Sidebar />
                <main className="main-zone">
                    <Route path="/profile" exact render={() => <Profile onLogout={onLogout}/>} />
                    <Route path="/mylist" exact render={() => <Mylist/>} />
                    <Route path="/favourites" exact render={() => <Favourites />} />
                    <Route path="/reviews" exact render={() => <Reviews />} />
                    <Route path="/prod/upload" exact render={() => <Upload onProductUpload={onProductUpload}/>} />
                </main>
            </div>
        )

    }
}

export default withRouter(Myzone)