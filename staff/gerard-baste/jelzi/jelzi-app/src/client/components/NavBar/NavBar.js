import React from 'react'
import './NavBar.css'
import {Link} from 'react-router-dom'


export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  onLogout = (e) => {
    e.preventDefault()
    this.props.onLogout(e)
  }

  componentDidMount(){
    this.isLoggedIn()
  }

  isLoggedIn = () => {
    return !!sessionStorage.getItem('email')
  }

  render() {
    return (
        <div class="nav-cont" >
      <nav class="navbar navbar-expand-lg justify-content-around">
        <a class="navbar-brand" href="#"><p className="titleNavbar">Jelzi Food</p></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <a class="nav-link"></a>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled"></a>
      </li>
    </ul>
<ul class="navbar-nav my-2 my-lg-0">
      <li class="nav-item">
        {!this.isLoggedIn() && <Link class="nav-link" to="/login">Login</Link>}
      </li>
      <li class="nav-item">
        {!this.isLoggedIn() && <Link class="nav-link" to="/register">Register</Link>}
      </li>
      <li class="nav-item">
        <Link class="nav-link" to="/home"  >Search</Link>
      </li>
      <li class="nav-item">
        {this.isLoggedIn() && <Link class="nav-link" to="/menus"  >Menus</Link>}
      </li>
      <li class="nav-item">
        {this.isLoggedIn() &&  <Link class="nav-link" to="/profile">Profile</Link>}
      </li>
      <li class="nav-item">
        {this.isLoggedIn() && <Link onClick={this.onLogout} class="nav-link" to="/">Logout</Link>}
      </li>
    </ul>
  </div>
</nav>
</div>
    );
  }
}


