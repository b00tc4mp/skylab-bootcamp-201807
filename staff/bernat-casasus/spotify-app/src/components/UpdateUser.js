import React ,{Component} from 'react'
import Feedback from './Feedback'
import swal from 'sweetalert2'

class UpdateUser extends Component{
    state = { newUsername: null, password: null, newPassword: null }

    keepNewUsername = event => this.setState({ newUsername: event.target.value })

    keepPassword = event => this.setState({ password: event.target.value })
    
    keepNewPassword = event => this.setState({ newPassword: event.target.value })

    onUpdate = event => {
        event.preventDefault()

        const { newUsername, password, newPassword } = this.state

        this.props.onClickSave(newUsername, password,newPassword)
    }

    render() {
        return <section>
            <form onSubmit={this.onUpdate}>
                <input type="text" placeholder="New user name" onChange={this.keepNewUsername} />
                <input type="password" placeholder="Current Password" onChange={this.keepPassword} required/>
                <input type="password" placeholder="New password" onChange={this.keepNewPassword} />
                <button type="submit">Guardar Cambios</button>
            </form>
            {this.props.error && <Feedback message={this.props.error} />}
        </section>
    }
}

export default UpdateUser