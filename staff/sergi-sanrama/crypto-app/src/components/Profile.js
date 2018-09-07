import React, { Component } from 'react'

import './styles/Profile.css'
// import swal from 'sweetalert';


class Profile extends Component {

    state = {
        password2: null,
        password3: null,
        newPassword: null,
    }

    keepPassword2 = event => this.setState({ password2: event.target.value })
    keepPassword3 = event => this.setState({ password3: event.target.value })
    keepNewPassword = event => this.setState({ newPassword: event.target.value })

    //Falta implementar, api, rutas, logic update y delete
    updatePassword = () => {
        this.props.updateUser(this.state.password2, '', this.state.newPassword)
            .then(() => this.setState({ update2: 'success' }))
            .catch(err => this.setState({ update2: err.message }))
    }

    deleteUser = () => {
        this.props.deleteUser(this.state.password3)
            .catch(err => {
                this.setState({ deleteError: err.message })
            })
    }

    render(){

        const {
            keepPassword2,
            keepPassword3,
            updatePassword,
            keepNewPassword,
            deleteUser
        } = this
        return (
            <div className=''>
                <p>TODO - Implement update/delete</p>a
                <div className=''>
                    <h3 className=''>Change password</h3>
                    <input type='password' className='' placeholder='password' onChange={keepPassword2}></input>
                    <input type='password' className='' placeholder=' new password' onChange={keepNewPassword}></input>
                    
                    <button type='password' className='' onClick={updatePassword}>Update</button>
                </div>
                <div className=''>
                    <h3 className=''>Delete account</h3>
                    <input type='password' className='' placeholder=' password' onChange={keepPassword3}></input>
                    
                    <button className='' onClick={deleteUser}>Delete</button>
                </div>
                <br/><button onClick={this.props.onLogout} className=''>Logout</button>
                {/* <a className='git_fork'href="https://github.com/you"><img src="https://s3.amazonaws.com/github/ribbons/forkme_left_gray_6d6d6d.png" alt="Fork me on GitHub" /></a> */}
            </div>
        )
    }
}


export default Profile