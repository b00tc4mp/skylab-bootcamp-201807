import React, { Component } from 'react'
import PreviewCard from '../cards/PreviewCard'
import UserTabCard from '../cards/UserTabCard'
import './PublicUser.css'
import { withRouter } from 'react-router-dom'
import logic from '../../logic'

class PublicUser extends Component {
    state = {
        user: null
    }

    componentDidMount () {
        const { idUser } = this.props.match.params

        return Promise.resolve()
            .then(() => logic.getPublicUser(idUser))
            .then(user => this.setState({ user }) )
            //.catch(({ message }) => this.setState({ errorMsg: message }))
    }


    render() {

        const { props: { onAddFavourite }, state: { user } } = this

        return(
            <main>
            {user ?
                <div>
                    <UserTabCard 
                        userName = {user.public_name}
                        userAvgScore = {user.avg_score}
                        userPhoto = {user.photo}
                        />
                </div> :

                <div className="publicUser-empty">
                    <h1>Something went wrong, we couldn't find this user</h1>
                </div>
            }
        </main>
        )
    }
}

export default  withRouter(PublicUser)
