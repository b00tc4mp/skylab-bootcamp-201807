import React, { Component } from 'react'
import { Button, Alert } from 'reactstrap';
import Footer from '../components/Footer'


import './styles/Profile.css'



class Profile extends Component {

    // state = {
    //     password2: null,
    //     password3: null,
    //     newPassword: null,
    // }

    // keepPassword2 = event => this.setState({ password2: event.target.value })
    // keepPassword3 = event => this.setState({ password3: event.target.value })
    // keepNewPassword = event => this.setState({ newPassword: event.target.value })

   
    // updatePassword = () => {
    //     this.props.updateUser(this.state.password2, '', this.state.newPassword)
    //         .then(() => this.setState({ update2: 'success' }))
    //         .catch(err => this.setState({ update2: err.message }))
    // }

    // deleteUser = () => {
    //     this.props.deleteUser(this.state.password3)
    //         .catch(err => {
    //             this.setState({ deleteError: err.message })
    //         })
    // }

    render(){

        // const {
        //     keepPassword2,
        //     keepPassword3,
        //     updatePassword,
        //     keepNewPassword,
        //     deleteUser
        // } = this
        return (
            <div className=''>
                {/* <p>TODO</p>
                <div className=''>
                <Alert className='alert-underconstruction' color="warning">
                   Update password and unregister.... Soon
                </Alert>
                    <h3 className=''>Change password</h3>
                    <input type='password' className='' placeholder='password' onChange={keepPassword2}></input>
                    <input type='password' className='' placeholder=' new password' onChange={keepNewPassword}></input>
                    
                    <button type='password' className='' onClick={updatePassword}>Update</button>
                </div>
                <div className=''>
                    <h3 className=''>Delete account</h3>
                    <input type='password' className='' placeholder=' password' onChange={keepPassword3}></input>
                    
                    <button className='' onClick={deleteUser}>Delete</button> */}
                {/* </div> */}
                <Alert className='alert-underconstruction' color="warning">
                Ops! in maintenance ... soon !
                </Alert>
                <Button onClick={this.props.logout} className='btn btn-logout'>Logout</Button>
                <Footer />
            </div>
        )
    }
}


export default Profile