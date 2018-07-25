import React, { Component } from 'react'

class UpdatePassword extends Component {

    state = {
        newPassword: null,
        password: null
    }

    keepNewPassword = event => this.setState({newPassword: event.target.value})
    keepPassword = event => this.setState({password: event.target.value})
    handleSubmit = event => {
        event.preventDefault()
        this.props.onUpdate(this.state.password, this.state.newPassword);
    }

    render() {
        return (
            <div>
                <form className="signup-form">
                    <input className="signup-form__input" placeholder="password" onChange={this.keepPassword}></input>
                    <input className="signup-form__input" placeholder="new password" onChange={this.keepNewPassword}></input>
                    <button className="signup-form__button" type="submit" onClick={this.handleSubmit}>Update</button>
                </form>
            </div>
        )
    }
}

export default UpdatePassword