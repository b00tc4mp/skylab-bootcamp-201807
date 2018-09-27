import React, {Component} from 'react'
import Message from '../sections/Message'
import './Login.css'

class Login extends Component {
    state = {
        username: null,
        password: null,
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

    keepUsername = e => this.setState({username: e.target.value})

    keepPassword = e => this.setState({password: e.target.value})

    submitLogin = e => {
        e.preventDefault()

        const { username, password } = this.state
        this.props.onLogin(username, password)
    }

    render() {

        const { submitLogin, keepUsername, keepPassword, state: {errorMsg, showFeedback} } = this

        return (
            <form className="babyboom-login form-signin" onSubmit={submitLogin}>
                <h1 className="title-login">Please sign in</h1>
                <label className="sr-only">Username</label>
                <input type="text" id="inputEmail" className="form-control" placeholder="Username" required="" autoFocus="" onChange={keepUsername}/>
                <label className="sr-only">Password</label>
                <input type="password" id="inputPassword" className="form-control" placeholder="Password" required="" onChange={keepPassword}/>
                <button className="nav-btn btn-block" type="submit">Sign in</button>
                {errorMsg && <Message success={false} text={this.props.errorMsg}/>}
                {showFeedback && <Message success={true} text={'Your Login was successful'}/>}
            </form>
        )
    }
}

export default Login







