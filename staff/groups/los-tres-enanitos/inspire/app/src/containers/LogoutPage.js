import React, { Component } from 'react'
import logic from '../logic'
import { withRouter } from 'react-router-dom'

class LogoutPage extends Component {

  componentDidMount() {
    logic.logout()
    if (this.props.location.pathname != '/')
      this.props.history.push('/')
  }

  render() {
    return null
  }
}

export default withRouter(LogoutPage)