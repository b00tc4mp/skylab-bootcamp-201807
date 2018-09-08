import React, { Component } from 'react'
import Message from '../sections/Message'
import './Update.css'
import { withRouter } from 'react-router-dom'


class Update extends Component {

    state = {
        username: this.props.username,
        password: null,
        newPassword: null,
        newUsername: null,
        errorMsg: null,
        showFeedback: false
    }

    componentDidMount() {
        this.props.hideFeedback()
    }

    static getDerivedStateFromProps(props, state) {
        if (props.errorMsg !== state.errorMsg || 
            props.showFeedback !== state.showFeedback) {
          return {
            errorMsg: props.errorMsg,
            showFeedback: props.showFeedback,
          };
        }
    
        return null; // Return null to indicate no change to state.
    }

    keepNewUsername = e => this.setState({newUsername: e.target.value})

    keepNewPassword = e => this.setState({newPassword: e.target.value})

    keepPassword = e => this.setState({password: e.target.value})
    
    submitUpdate = e => {
        e.preventDefault()
        this.props.onUpdateProp(this.state.password, this.state.newUsername, this.state.newPassword)
    }

    
    render () {
        const {errorMsg, showFeedback} = this.state

        return (
        <section>
            <form className="form-update" onSubmit={this.submitUpdate}>
                <h1 className="h3 mb-3 font-weight-normal">Update Profile</h1>
                <div className="sr-info">
                    <label>Current Username: </label>
                    <span> {this.state.username}</span>
                </div>
                <label className="sr-only">Password</label>
                <input className="form-control" type="password" placeholder="type current password" onChange={this.keepPassword}/>
                <label className="sr-only">New Username (optional)</label>
                <input className="form-control" type="text" placeholder="type new Username" onChange={this.keepNewUsername}/>
                <label className="sr-only">New Password (optional)</label>
                <input className="form-control" type="password" placeholder="type new Password" onChange={this.keepNewPassword}/>
                <button className="btn btn-lg btn-block" type="submit">Update Profile</button>
                {errorMsg && <Message success={false} text={this.props.errorMsg}/>}
                {showFeedback && <Message success={true} text={'Your update was successful'}/>}
            </form>
        </section>
        )        
    }
}

export default Update;