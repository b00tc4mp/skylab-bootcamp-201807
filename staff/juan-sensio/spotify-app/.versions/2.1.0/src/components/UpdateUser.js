import React, { Component } from 'react'

class UpdateUser extends Component {

    state = {
        username: null,
        password: null
    }

    keepUsername = event => this.setState({username: event.target.value})
    keepPassword = event => this.setState({password: event.target.value})
    handleSubmit = event => {
        event.preventDefault()
        this.props.onUpdate(this.state.username, this.state.password);
    }

    render() {
        return (
            <div>
                <form className="signup-form">
                    <input className="signup-form__input" placeholder="password" onChange={this.keepPassword}></input>
                    <input className="signup-form__input" placeholder="new username" onChange={this.keepUsername}></input>
                    <button className="signup-form__button" type="submit" onClick={this.handleSubmit}>Update</button>
                </form>
            </div>
        )
    }
}

export default UpdateUser