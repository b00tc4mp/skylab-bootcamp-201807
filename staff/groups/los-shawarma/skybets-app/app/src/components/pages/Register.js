import React, {Component} from 'react'
import Message from '../sections/Message'
import './Register.css';


class Register extends Component {
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

    submitRegistration = e => {
        e.preventDefault()

        const {username, password} = this.state
        this.props.onRegisterProp(username, password)
    }

    render () {
        const {submitRegistration, keepUsername, keepPassword } = this
        const {errorMsg, showFeedback} = this.state

        return (
            <section>
                <form className="form-register" onSubmit={submitRegistration}>
                    <h1 className="h3 mb-3 font-weight-normal">Registration</h1>
                    <label className="sr-only">Username</label>
                    <input type="text" className="form-control" placeholder="Username" onChange={keepUsername}/>
                    <label className="sr-only">Password</label>
                    <input type="password" className="form-control" placeholder="Password" onChange={keepPassword}/>
                    <button type="submit" className="btn btn-lg btn-block" >Register</button>
                </form>
                {errorMsg && <Message success={false} text={this.props.errorMsg}/>}
                {showFeedback && <Message success={true} text={'Your registration was successful'}/>}
            </section>
        )
    }
    
}

export default Register;