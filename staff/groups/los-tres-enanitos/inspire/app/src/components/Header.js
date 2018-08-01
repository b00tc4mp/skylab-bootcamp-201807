import React, { Component } from 'react'
import Search from './Search';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
import logic from '../logic'

class Header extends Component {

  state = {
    loggedIn: logic.loggedIn,
  }

  handleSearchSubmit = query => {
    this.props.history.push('/search/photos/' + query)
  }

  goToHome = (event) => {
    event.preventDefault()
    this.props.history.push('/')
  }

  goToLogin = (event) => {
    event.preventDefault()
    this.props.history.push('/login')
  }

  goToRegister = (event) => {
    event.preventDefault()
    this.props.history.push('/join')
  }

  goToProfile = (event) => {
    event.preventDefault()
    this.props.history.push(`/profile/${logic.userId}`)
  }

  handleLogout = (event) => {
    event.preventDefault()
    logic.logout()
    this.setState({ loggedIn: false })
    
    if (this.props.location.pathname != '/')
      this.props.history.push('/')
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
            />
          }
        </div>
        <div className="site-nav">
          {
            !this.state.loggedIn && (
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
            this.state.loggedIn && (
              <ul className="site-nav__list">
                <li className="site-nav__item">
                  <a href="#/" onClick={this.handleLogout} className="site-nav__logout">Logout</a>
                </li>
                <li className="site-nav__item">
                  <a href="#" onClick={this.goToProfile} className="site-nav__profile">
                    <img src="https://thumbs.dreamstime.com/b/omita-el-icono-del-perfil-avatar-placeholder-gris-de-la-foto-99724602.jpg" alt=""
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