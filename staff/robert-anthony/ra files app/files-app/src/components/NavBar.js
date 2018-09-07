import React, { Component } from 'react';
import logic from '../logic'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'


export default class NavBar extends Component {

  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
  }


  render() {
    return <div>
      <h1>FILES</h1>
      {!this.props.isLoggedIn && <nav>
        &gt;&nbsp;<Link to="/register">register</Link>&nbsp;<Link to="/login">login</Link><span className="blink">_</span>
        <p>-----------------</p>
      </nav>
      }
      {this.props.isLoggedIn && <nav>&gt;&nbsp;<Link to="/files">files</Link>&nbsp;<Link to="/profile">profile</Link>&nbsp;<Link
        to="/logout">logout</Link><span className="blink">_</span>
        <p>-----------------</p>
      </nav>
      }
    </div>
  }


}

