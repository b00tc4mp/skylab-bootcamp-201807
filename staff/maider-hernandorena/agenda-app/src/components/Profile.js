import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'

class Profile extends Component{

  state = {
    username: "",
    password: "",
    newPassword: "",
    updateError : "",
    deleteError : "",
    updated: ""
  }

  keepPassword = e => this.setState({ password: e.target.value })
  keepNewPassword = e => this.setState({ newPassword: e.target.value })

  onUpdate = e => {
    e.preventDefault()
    const {password, newPassword} = this.state
    const {username, token} = this.props
    logic.updatePassword(username, password, newPassword, token)
      .then(({ message }) => this.setState({ updated: message }))
      .catch(({ message }) => this.setState({ updateError: message }))
  }

  onDelete = e => {
    e.preventDefault()
    const {password} = this.state
    const {username, token} = this.props
    logic.deleteUser(username, password, token)
      .then(() => {
        this.setState({username: '', password: ''})
        this.props.history.push('/')
      })
      .catch(({ message }) => this.setState({deleteError: message}))
  }

  render(){
    const { state: {updateError, deleteError, updated}, keepPassword, keepNewPassword, onUpdate, onDelete} = this
    return <main>
            <div>
              <nav>
                <p>Update your Password</p>
              </nav>
              <form onSubmit={onUpdate}>
                <input type="text" name="username" placeholder="username" disabled value={this.props.username} />
                <input type="password" name="password" placeholder="password" onChange={keepPassword} />
                <input type="password" name="newPassword" placeholder="New password" onChange={keepNewPassword} />
                <button type="submit">Update</button>
              </form>
              {updateError && <p className="error">{updateError}</p>}
              {updated && <p className="error">{updated}</p>}
            </div>
            <div>
              <nav>
                <p>Delete your account</p>
              </nav>
              <form onSubmit={onDelete}>
                <input type="text" name="username" placeholder="username" disabled value={this.props.username} />
                <input type="password" name="password" placeholder="password" onChange={keepPassword} />
                <button type="submit">Delete</button>
              </form>
              {deleteError && <p className="error">{deleteError}</p>}
            </div>
          </main>
  }
  
  
}

export default withRouter(Profile)