import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './Header.sass'

class Header extends Component {

  handleHomeClick = event => {
    event.preventDefault()
    this.props.onHomeClick()
  }

  handleExploreClick = event => {
    event.preventDefault()
    this.props.onExploreClick()
  }

  handleProfileClick = event => {
    event.preventDefault()
    this.props.onProfileClick()
  }

  handleNewPostClick = event => {
    event.preventDefault()
    this.props.onNewPostClick()
  }

  render() {
    return (
      <header className="Header">
        <div className="Header-logoWrapper">
          <a href="#/" className="Header-logoLink" onClick={this.handleHomeClick}>
            <span className="Header-iconLogo"></span>
            <span className="Header-logo"></span>
          </a>
        </div>
        <div className="Header-searchWrapper">
          <input className="Header-search" type="text" placeholder="Search" />
        </div>
        <div className="Header-nav">
          <a className="Header-navLink" href="#/" onClick={this.handleNewPostClick}>
            <i className="Header-navIcon far fa-plus-square"></i>
          </a>
          <a className="Header-navLink" href="#/" onClick={this.handleExploreClick}>
            <i className="Header-navIcon far fa-compass"></i>
          </a>
          <a className="Header-navLink" href="#/" onClick={this.handleProfileClick}>
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