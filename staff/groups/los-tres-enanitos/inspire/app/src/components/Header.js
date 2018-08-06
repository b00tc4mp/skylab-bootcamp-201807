import React, { Component } from 'react'
import Search from './Search';
import { withRouter } from 'react-router-dom'
import logic from '../logic'

class Header extends Component {

  handleSearchSubmit = query => {
    this.props.history.push('/search/photos/' + query)
  }

  goToHome = (event) => {
    event.preventDefault()
    if (this.props.location.pathname !== '/')
      this.props.history.push('/')
  }

  goToLogin = (event) => {
    event.preventDefault()
    if (this.props.location.pathname !== '/login')
      this.props.history.push('/login')
  }

  goToRegister = (event) => {
    event.preventDefault()
    this.props.history.push('/join')
  }

  goToProfile = (event) => {
    event.preventDefault()
    if (this.props.location.pathname !== `/profile/${logic.userId}`)
      this.props.history.push(`/profile/${logic.userId}`)
  }

  handleLogout = (event) => {
    event.preventDefault()
    this.props.history.push('/logout')
  }

  render() {
    return (
      <header className="header">
        <div className="logo-container">
          <a href="#/" onClick={this.goToHome}>
            <img src="./images/logo.png" alt="" className="logo" />
          </a>
        </div>
        <div>
          {
            this.props.visibleSearch && <Search
              inputPlaceholder="Insert a word to inspire your mind..."
              position="header"
              onSearch={this.handleSearchSubmit}
              query={this.props.query}
            />
          }
        </div>
        <div className="site-nav">
          {
            !this.props.loggedIn && (
              <ul className="site-nav__list">
                <li className="site-nav__item">
                  <a href="#/" onClick={this.goToLogin} className="site-nav__login">Login</a>
                </li>
                <li className="site-nav__item">
                  <a href="#/" onClick={this.goToRegister} className="site-nav__register">Join free</a>
                </li>
              </ul>
            )
          }
          {
            this.props.loggedIn && (
              <ul className="site-nav__list">
                <li className="site-nav__item">
                  <a href="#/" onClick={this.handleLogout} className="site-nav__logout">Logout</a>
                </li>
                <li className="site-nav__item">
                  <a href="#/" onClick={this.goToProfile} className="site-nav__profile">
                    <img src="images/default-user.jpg" alt=""
                      className="site-nav__profile-image" />
                  </a>
                </li>
              </ul>
            )
          }
        </div>
      </header>
    )
  }
}

Header.defaultProps = {
  visibleSearch: true
};

export default withRouter(Header)