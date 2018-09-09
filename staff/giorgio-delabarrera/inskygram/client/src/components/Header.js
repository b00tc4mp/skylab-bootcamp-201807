import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
// import logic from '../logic'

class Header extends Component {

  // handleSearchSubmit = query => {
  //   this.props.history.push('/search/photos/' + query)
  // }

  goToHome = (event) => {
    event.preventDefault()
    if (this.props.location.pathname !== '/')
      this.props.history.push('/')
  }

  // goToLogin = (event) => {
  //   event.preventDefault()
  //   if (this.props.location.pathname !== '/login')
  //     this.props.history.push('/login')
  // }

  // goToRegister = (event) => {
  //   event.preventDefault()
  //   this.props.history.push('/join')
  // }

  goToNewPost = event => {
    event.preventDefault()
    if (this.props.location.pathname !== '/p/new')
      this.props.history.push('/p/new')
  }

  goToExplore = event => {
    event.preventDefault()

    // if (this.props.location.pathname !== `/profile/${logic.userId}`)
    //   this.props.history.push(`/profile/${logic.userId}`)
    this.props.history.push('/explore')
  }

  goToProfile = event => {
    event.preventDefault()
    
    this.props.history.push(`/giodelabarrera`)

    // if (this.props.location.pathname !== `/profile/${logic.userId}`)
    //   this.props.history.push(`/profile/${logic.userId}`)
  }

  // handleLogout = (event) => {
  //   event.preventDefault()
  //   this.props.history.push('/logout')
  // }

  render() {
    return (
      <header>
        <span>Logo</span>
        <input type="text" placeholder="search" />
        <ul>
          <li><a href="#/" onClick={this.goToNewPost}>New Post</a></li>
          <li><a href="#/" onClick={this.goToExplore}>Explore</a></li>
          <li><a href="#/" onClick={this.goToProfile}>Profile</a></li>
        </ul>
      </header>
    )
  }
}

// Header.defaultProps = {
//   visibleSearch: true
// };

export default withRouter(Header)