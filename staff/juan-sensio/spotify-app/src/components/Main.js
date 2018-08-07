import React, { Component } from 'react'

import './Main.css'

import Profile from './Profile'
import Navbar from './Navbar'
import Search from './Search'
import ArtistPanel from './ArtistPanel'
import AlbumPanel from './AlbumPanel'
import Favorites from './Favorites'

import logic from '../logic'
logic.spotifyToken = 'BQCKSndZM08P_0aofngSBLoS8moJhWUwG-3eg-P1-5yhhTW1UdTOK-lhz8K3vepGLJnCPMcK9QB2GOmNNczqGamsK0sJFEqqz6gj7tdMXA7h6DM896oCsMyagXTIG7FVInL7L4w4LG5vygjgoQ'

class Main extends Component {
    state = {
        searchActive: true,
        profileActive: false,
        artists: [],
        artistPanelActive: false,
        artistId: null,
        albumId: null,
        albumPanelActive: false,
        albums: [],
        tracks: [],
        track: null,
        favsActive: false
    }

    onProfile = () => this.setState({ 
        searchActive: false, 
        profileActive: true, 
        artistPanelActive: false, 
        albumPanelActive: false,
        favsActive: false
    })
    onSearch = () => this.setState({ 
        searchActive: true, 
        profileActive: false, 
        artistPanelActive: false, 
        albumPanelActive: false,
        favsActive: false
    })
    onFavs = () => this.setState({
        searchActive: false,
        profileActive: false,
        artistPanelActive: false,
        albumPanelActive: false,
        favsActive: true
    })

    logout = () => {
        this.setState({ profileActive: false })
        this.props.onLogout()
    }
    updateUser = (password, newUsername, newPassword) => {
        return logic.updateUser(password, newUsername, newPassword)
    }
    deleteUser = (password) => {
        return logic.unregisterUser(password)
            .then(() => {
                this.logout()
            })
    }

    onSearchArtists = query => {
        return logic.searchArtists(query)
            .then(artists => this.setState({
                artists: artists.map(({ id, name }) => ({ id, name }))
            }))

    }
    onClickArtist = id => {
        this.setState({ searchActive: false, artistPanelActive: true, artistId: id })
        logic.retrieveAlbumsByArtistId(id)
            .then(albums => this.setState({
                albums: albums.map(({ id, name }) => ({ id, name }))
            }))
            .catch(console.log)
    }
    onArtistBack = () => this.setState({ searchActive: true, artistPanelActive: false })
    onClickAlbum = id => {
        this.setState({ searchActive: false, albumPanelActive: true, artistPanelActive: false })
        logic.retrieveTracksByAlbumId(id)
            .then(tracks => this.setState({
                tracks: tracks.map(({ id, name }) => ({ id, name }))
            }))
            .catch(console.log)
    }
    onAlbumBack = () => this.setState({ artistPanelActive: true, albumPanelActive: false, track: null })
    onClickTrack = id => {
        this.setState({ track: id })
        window.scrollTo(0, 0);
    }

    render() {
        const {
            state: {
                profileActive,
                searchActive,
                artists,
                artistId,
                artistPanelActive,
                albumId,
                albumPanelActive,
                albums,
                tracks,
                track,
                favsActive
            },
            onProfile,
            onSearch,
            logout,
            updateUser,
            deleteUser,
            onSearchArtists,
            onClickArtist,
            onClickAlbum,
            onArtistBack,
            onAlbumBack,
            onClickTrack,
            onFavs
        } = this

        return (
            <div className="main">
                {searchActive && <Search search={onSearchArtists} items={artists} onClick={onClickArtist} />}
                {artistPanelActive && <ArtistPanel albums={albums} id={artistId} onClickAlbum={onClickAlbum} back={onArtistBack} />}
                {albumPanelActive && <AlbumPanel track={track} tracks={tracks} id={albumId} back={onAlbumBack} onClickTrack={onClickTrack} />}
                {profileActive && <Profile onLogout={logout} updateUser={updateUser} deleteUser={deleteUser} />}
                {favsActive && <Favorites />}
                <Navbar profile={onProfile} search={onSearch} favs={onFavs} />
            </div>
        )
    }
}

export default Main