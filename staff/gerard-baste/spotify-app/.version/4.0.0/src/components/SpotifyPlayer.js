import React, { Component } from 'react'
import './SpotifyPlayer.css'
import logic from '../logic'
import Feedback from './Feedback';

class SpotifyPlayer extends Component {
    state = {
        error: '',
        favorite: logic.isFavorite(this.props.track.id)
    }

    componentWillReceiveProps(newProps) {
        this.refreshFavorite(newProps)
    }

    // TODO check for future version 17 (make it work!)
    // componentDidUpdate(prevProps) {
    //     if (prevProps.track.id !== this.props.track.id)
    //         this.refreshFavorite(this.props.track.id)
    // }

    onToggleFavorite = () => {
        logic.toggleTrackFavorite(this.props.track.id)
            .then(() => this.refreshFavorite(this.props))
            .catch(({ message }) => this.setState({ error: message }))
    }

    refreshFavorite(props) {
        this.setState({ favorite: logic.isFavorite(props.track.id) }) 
    } 

    render() {
        const { track: { id, name } } = this.props
        const { error, favorite } = this.state

        return <section>
            <iframe title={name} src={`https://open.spotify.com/embed?uri=spotify:track:${id}`} width="300" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            <i className={"fa-heart fa-2x " + (favorite ? "fas fa-heart-active" : "far fa-heart-inactive")} onClick={this.onToggleFavorite}></i>
            {error && <Feedback message={error} />}
        </section>
    }
}

export default SpotifyPlayer