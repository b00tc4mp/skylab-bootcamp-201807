import React, { Component } from 'react'

class DeleteUser extends Component {

    state = {
        password: null
    }

    keepPassword = event => this.setState({ password: event.target.value })
    handleSubmit = event => {
        event.preventDefault()
        this.props.onDelete(this.state.password);
    }

    render() {
        let status = this.props.deleteStatus;
        if (status === 0)
            return (
                <div>
                    <form className="signup-form">
                        <input className="signup-form__input" placeholder="password" onChange={this.keepPassword}></input>
                        <button className="signup-form__button" type="submit" onClick={this.handleSubmit}>Delete Account</button>
                    </form>
                </div>
            )
        else if (status === 1)
            return (
                <h1> ERROR, try again </h1>
            )
        else if (status === 2)
            return (
                <h1> Good Bye </h1> 
            )
    }
}

export default DeleteUser