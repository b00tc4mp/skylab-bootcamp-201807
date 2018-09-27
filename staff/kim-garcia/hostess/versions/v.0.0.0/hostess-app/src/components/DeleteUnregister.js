import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'

class DeleteUnregister extends Component {

    state = {
        changePas: false,
        delete: false,
        oldPassword: '',
        newPassword: '',
        error: '',
        success: false
    }

    handleChangePas = () => this.setState({ changePas: true, error: '', success: false })

    handleUnregister = () => this.setState({ delete: true, error: '', success: false })

    handleNo = event => {
        event.preventDefault()

        this.setState({ changePas: false, delete: false, error: '' })
    }

    handleYes = event => {
        event.preventDefault()

        if(!this.props.business) {
            return logic.unregisterHostess(this.props.email, this.state.oldPassword, this.props.token)
                .then(() => this.props.onLogout(event))
                .catch(err => this.setState({ error: err.message }))                
        }

        if(this.props.business) {
            return logic.unregisterBusiness(this.props.email, this.state.oldPassword, this.props.token)
                .then(() => this.props.onLogout(event))
                .catch(err => this.setState({ error: err.message }))                
        }
    }

    handleOld = event => this.setState({ oldPassword: event.target.value })

    handleNew = event => this.setState({ newPassword: event.target.value })

    handleTheChange = event => {
        event.preventDefault()

        const { oldPassword, newPassword } = this.state

        this.setState({ error: '', success: ''})

        if (!this.props.business) {
            logic.updatePasswordHostess(this.props.email, oldPassword, newPassword, this.props.token)
            .then(() => this.setState({ error: '', success: true}))
            .catch(err => this.setState({ error: err.message }))                
            
            this.setState({ changePas: false, delete: false })
        }
        
        if (this.props.business) {
            logic.updatePasswordBusiness(this.props.email, oldPassword, newPassword, this.props.token)
            .then(() => this.setState({ error: '', success: true}))
            .catch(err => this.setState({ error: err.message }))                

            this.setState({ changePas: false, delete: false })
        }
    }


    render() {
        return (
            <div>
                {
                    !this.state.changePas && !this.state.delete && (
                        <div className="buttons">
                            <button type="button" onClick={this.handleChangePas} className="deletes-button">CHANGE PASSWORD</button>
                            <button type="button" onClick={this.handleUnregister} className="deletes-button">DELETE ACOUNT</button>
                        </div>
                    )
                }
                {
                    !this.state.changePas && this.state.delete && (
                        <div className="buttons">
                            <p><span>Are you sure you wana delete the acount for ever?</span></p>
                            <input type="password" onChange={this.handleOld} placeholder="Insert password to delete the acount"></input>
                            <button type="button" onClick={this.handleNo} className="deletes-button">NO</button>
                            <button type="button" onClick={this.handleYes} className="deletes-button">YES</button>
                        </div>
                    )
                }
                {
                    this.state.changePas && !this.state.delete && (
                        <div className="buttons">
                            <input type="password" placeholder="Password" onChange={this.handleOld}></input>
                            <input type="password" placeholder="New password" onChange={this.handleNew}></input>
                            <button type="button" onClick={this.handleTheChange} className="deletes-button">CHANGE PASSWORD</button>
                        </div>
                    )
                }
                {
                    this.state.success && (<div className="success">Your password has been updated correctly</div>)
                }
                {
                    this.state.error && !this.state.success && (<div className="error">{this.state.error}</div>)
                }


            </div>
        )
    }
}

export default withRouter(DeleteUnregister)