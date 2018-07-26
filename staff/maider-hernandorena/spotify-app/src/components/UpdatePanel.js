import React, {Component} from 'react'
import IfWrong from './IfWrong'
import './css/update.css'

class UpdatePanel extends Component {

    state = { 
        password: null,
        newUsername: null,
        newPassword: null,
    }

    keepPassword = event => this.setState({ password: event.target.value })
    keepNewUsername = event => this.setState({ newUsername: event.target.value })
    keepNewPassword = event => this.setState({ newPassword: event.target.value })

    onUpdatePanel = event => {
        event.preventDefault()
        const { password, newUsername, newPassword } = this.state
        this.props.onUpdate( password, newUsername, newPassword )
    }

    render() {
        return (
            <section className="all">
                <form className="all__form" onSubmit={this.onUpdatePanel}>
                    <input className="all__form__space" type="password" onChange={this.keepPassword} placeholder="enter your old password" />
                    <input className="all__form__space" type="text" onChange={this.keepNewUsername} placeholder="enter your new username"/> {/* NewUsername */}
                    <input className="all__form__space" type="password" onChange={this.keepNewPassword} placeholder="enter your new password" /> {/* NewPassword */}
                    <button className="all__form__button" type="submit" onClick={() => this.props.updated} >Change</button>
                </form>
                {this.props.error && <IfWrong message={this.props.error} />}
                <a className="all__link" href="#/" onClick={this.props.onBack} >Go Back</a>
            </section>
        )
    }
}

export default UpdatePanel