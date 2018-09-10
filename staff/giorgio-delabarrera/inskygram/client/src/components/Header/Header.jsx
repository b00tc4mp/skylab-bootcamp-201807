import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
// import logic from '../logic'
import './Header.sass'

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
      <header className="Header">
        <div className="Header-logoWrapper">
          <a href="#/" className="Header-logoLink">
            <span className="Header-iconLogo"></span>
            <span className="Header-logo"></span>
          </a>
        </div>
        <div className="Header-searchWrapper">
          <input className="Header-search" type="text" placeholder="Search" />
        </div>
        <div className="Header-nav">
          <a className="Header-navLink" href="#/" onClick={this.goToNewPost}>
            <i className="Header-navIcon far fa-plus-square"></i>
          </a>
          <a className="Header-navLink" href="#/" onClick={this.goToExplore}>
            <i className="Header-navIcon far fa-compass"></i>
          </a>
          <a className="Header-navLink" href="#/" onClick={this.goToProfile}>
            <i className="Header-navIcon far fa-user"></i>
          </a>
        </div>
      </header>
    )
  }
}

// Header.defaultProps = {
//   visibleSearch: true
// };

export default withRouter(Header)