import React, { Component } from 'react'
import Feedback from './Feedback'

class UpdateUserData extends Component {
    state = {  password: null, nUserName: null,nPassword:null}

    storePassword = event => this.setState({ password: event.target.value })

    storeNPassword = event => this.setState({ nPassword: event.target.value })

    storeNUsername = event => this.setState({ nUserName: event.target.value })

    onChangeUserData = event => {
        event.preventDefault()

        const { password,nUserName,nPassword } = this.state

        this.props.onChangeUserData( password,nUserName,nPassword,)
    }

    render() {
        return <section>
            <form onSubmit={this.onChangeUserData}>
               <label>Password</label> <input type="password" onChange={this.storePassword} />
               <label>New User Name</label> <input type="text" onChange={this.storeNUsername} />
              <label>New Password</label> <input type="text" onChange={this.storeNPassword} />

                <button type="submit">Change User Data</button>
            </form>
            {this.props.error && <Feedback message={this.props.error} />}
            <p>
                <a href="/#" onClick={this.props.onCancel}>Cancel</a>
            </p>
        </section>
    }
}

export default UpdateUserData