import { Component } from 'react'
import { withRouter } from 'react-router-dom'

class LogoutPage extends Component {

  componentDidMount() {
    this.props.onLogout()
  }

  render() {
    return null
  }
}

export default withRouter(LogoutPage)