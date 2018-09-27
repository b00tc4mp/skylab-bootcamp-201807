import React, { Component } from 'react'
import './Myzone.css'
import Upload from './pages/Upload'
import Sidebar from './sections/Sidebar'
import Profile from './pages/Profile'
import Mylist from './pages/Mylist'
import Mychats from './pages/Mychats'
import Favourites from './pages/Favourites'
import Reviews from './pages/Reviews'

import { Route, withRouter } from 'react-router-dom'

class Myzone extends Component {

    state = {
    }

    render() {

        const { onLogout, onProductUpload, onRemoveFavourite, onUploadProfilePhoto, idFavs, profilePhoto, onProductDetail, idProd, loaded } = this.props

        return (
            <div>
                <Sidebar profilePhoto={profilePhoto}/>
                <main className="main-zone">
                    <Route path="/profile" exact render={() => <Profile onUploadProfilePhoto={onUploadProfilePhoto} profilePhoto={profilePhoto} onLogout={onLogout}/>} />
                    <Route path="/mylist" exact render={() => <Mylist onProductDetail={onProductDetail}/>} />
                    <Route path="/mychats" exact render={() => <Mychats productId={idProd} />} />
                    <Route path="/favourites" exact render={() => <Favourites onRemoveFavourite={onRemoveFavourite} idFavs={idFavs} onProductDetail={onProductDetail}/>} />
                    <Route path="/reviews" exact render={() => <Reviews />} />
                    <Route path="/prod/upload" exact render={() => <Upload onProductUpload={onProductUpload} loaded={loaded}/>} />
                </main>
            </div>
        )

    }
}

export default withRouter(Myzone)