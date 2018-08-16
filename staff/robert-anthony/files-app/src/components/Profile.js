import React, {Component} from 'react'
import logic from '../logic'
import fileSaver from 'file-saver'

class Profile extends Component {
  state = {passwordFeedback: null, newPassword1: "", newPassword2: ""}

  keepPassword1 = (e) => {
    this.setState({newPassword1: e.target.value})
  }
  keepPassword2 = (e) => {
    this.setState({newPassword2: e.target.value})
  }

  onUpdatePassword = (e) => {
    const {newPassword1, newPassword2} = this.state
    const {username, token} = this.props
    e.preventDefault()
    if (newPassword1 === newPassword2) {
      logic.updatePassword(username, newPassword1, token)
        .then(res => {
          this.setState({passwordFeedback: "Password reset"})
          this.setState({newPassword1:"",newPassword2:""})
        })
        .catch(err => this.setState({passwordFeedback: err.message}))
    } else {
      this.setState({passwordFeedback: "Passwords don't match"})
    }
  }

  render() {
    const {passwordFeedback, newPassword1, newPassword2} = this.state

    return <main>
      <div className="screen">
        <nav>
          &gt; <a href="/files">files</a> <a href="/logout">logout</a> <span className="blink">_</span>
          <img className="image" src="./default-image.png" alt=""/>
        </nav>

        <form onSubmit={this.onUpdatePassword}>
          <label htmlFor="newpwd1">New password</label>
          <input value={newPassword1} id="newpwd1" type="password" name="newpassword1" autoFocus
                 onChange={this.keepPassword1}/>
          <br/>
          <label  htmlFor="newpwd2">Repeat password</label>

          <input value={newPassword2} id="newpwd2" type="password" name="newpassword2" onChange={this.keepPassword2}/>
          <button type="submit">upload</button>
        </form>
        {passwordFeedback && <h3>{passwordFeedback}</h3>}
      </div>
    </main>
  }
}

export default Profile