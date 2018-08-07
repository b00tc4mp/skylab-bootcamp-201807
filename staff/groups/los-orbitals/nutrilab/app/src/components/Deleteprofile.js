import React, {Component} from 'react'
import Feedback from './Feedback'
import '../sass/profile.css'

class Deleteprofile extends Component {

    state = {
        password: null
    }

    savePassword = (event) => this.setState ({password: event.target.value}) 

    deleteUser = event => {
        event.preventDefault()
        const { password } = this.state
        this.props.onDelete(password)
    }

    linkToModifyProfile = (event) => {
        event.preventDefault()
        this.props.goToProfile()
    }

    render() {
        const {deleteUser, linkToModifyProfile} = this
        return  <section className="profile__delete">
                            <h2 className="profile__delete__title">Delete profile</h2>
                            <p className="profile__delete__text">it is required to fill in the field with the * symbol</p>
                            {this.props.feedbackdelete && <Feedback message={this.props.feedbackdelete} />}
                            <form onSubmit={deleteUser}>
                                <input type="password" placeholder="Password*" onChange={this.savePassword}/>
                                <button type="submit">Delete</button>
                            </form>
                        <p>Go to <a href="/#" onClick={linkToModifyProfile}>Modify profile</a></p> 
                    </section>
    }
}

export default Deleteprofile