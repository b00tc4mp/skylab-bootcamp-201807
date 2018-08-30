import React, { Component } from 'react'

class Account extends Component {
    render() {
        const { close, logout } = this.props
        return (
            <div className='account'>
                <p> account </p>
                <button onClick={close}>back</button>
                <button onClick={logout}>logout</button>
            </div>
        )
    }
}

export default Account