import React, { Component } from 'react'

class DeleteUser extends Component {

    state = {
        password: null
    }

    keepPassword = event => this.setState({password: event.target.value})
    handleSubmit = event => {
        event.preventDefault()
        this.props.onUpdate(this.state.password);
    }

    render() {
        return (
            <div>
                <form className="signup-form">
                    <input className="signup-form__input" placeholder="password" onChange={this.keepPassword}></input>
                    <button className="signup-form__button" type="submit" onClick={this.handleSubmit}>Delete Account</button>
                </form>
            </div>
        )
    }
}

export default DeleteUser