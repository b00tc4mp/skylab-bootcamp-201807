import React, { Component } from 'react'
import Avatar from '@material-ui/core/Avatar'
import { Link } from 'react-router-dom'
import logic from '../../logic'
import './Nav.css'
//import logo from '../../assets/abc-blau.png'
import logo from '../../assets/block.svg'

class Nav extends Component {
    state = {
        loggedIn: logic.loggedIn,
        photoUrl: null
      }

    static getDerivedStateFromProps(props, state) {
        if (props.loggedIn !== state.loggedIn)
          return { loggedIn: props.loggedIn}

        if (props.profilePhoto !== state.photoUrl)
          return { photoUrl: props.profilePhoto}

        return null; // Return null to indicate no change to state.
    }

    componentDidMount() {
        this.getProfilePhoto()
    }

    getProfilePhoto = () => {
        const photoUrl = logic.getUserField('photo')

        if (logic.loggedIn && photoUrl) 
            this.setState({ photoUrl })
    }
    
    render() {
        const { loggedIn, photoUrl } = this.state


        //<i className="material-icons">face</i>
        //<i className="material-icons">child_care</i>
        //<i className="material-icons">account_circle</i>

        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand logo animated tada" to='/'><img src={logo} alt="Smiley face" height="42" width="42"/></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {/*<ul className="navbar-nav mr-auto">
                        
        </ul>*/}
                    <form className="form-inline my-2 my-lg-0">
                    {/*<form className="navbar-form navbar-left" role="search">*/}
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Search" name="search" />
                            <div className="input-group-btn">
                                <button className="btn btn-default" type="submit"><i className="glyphicon glyphicon-search"></i></button>
                                {/*<button className="btn btn-default" type="submit"><i className="material-icons md-dark">search</i></button>*/}
                            </div>
                        </div>
                    </form>
                    <ul className="nav navbar-nav navbar-right">

                        {/*<li className="nav-item">
                            <div className="container">
                                <form action="/action_page.php">
                                    <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Search" name="search" />
                                    <div className="input-group-btn">
                                        <button className="btn btn-default" type="submit"><i className="glyphicon glyphicon-search"></i></button>
                                    </div>
                                    </div>
                                </form>
                            </div>
                        </li>*/}
                        
                        {!loggedIn && <li className="nav-item">
                        <Link className="nav-link" to='/login'>LogIn</Link>
                        </li>}
                        {!loggedIn && <li className="nav-item">
                        <Link className="nav-link" to='/register'>Register</Link>
                        </li>}
                        {loggedIn && <li className="nav-item">
                            <Link className="nav-link" to='/mylist'>
                                <div className="nav-myzone-link">
                                {photoUrl?
                                    <Avatar alt="profile photo" size={36} style={{ alignSelf: 'center' }} src={photoUrl} className="photo" /> : 
                                    <i className="material-icons md-36">face</i>
                                }
                                    <span>My zone</span>
                                </div>
                            </Link>
                        </li>}
                        <li className="nav-item">
                        <Link className="nav-link" to='/prod/upload'>Upload product</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }

}

export default Nav

/*
<div class="container">
    <nav class="navbar navbar-default" role="navigation">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>    
      </div>
      <div class="navbar-collapse collapse">
        <ul class="nav navbar-nav">
          <li class="navbar-left"><a href="#">Left 1</a></li>
          <li class="navbar-left"><a href="#">Left 2</a></li>
          <li class="active"><a href="#">Center 1</a></li>
          <li><a href="#">Center 2</a></li>
          <li><a href="#">Center 3</a></li>
          <li class="navbar-right"><a href="#">Right 2</a></li>
          <li class="navbar-right"><a href="#">Right 1</a></li>
        </ul>
      </div>
    </nav>
    <h1>Hello</h1>
</div>

*/



/*
<div class="collapse navbar-collapse" id="bs-example-navbar">
          <form class="navbar-form navbar-right" role="search">
            <div class="form-group">
              Navbar text
              <input type="text" class="form-control" placeholder="Search">
            </div>
            <button type="submit" class="btn">Search</button>
          </form>
          <ul class="nav navbar-nav navbar-left">
                <li class="active"><a href="/">Home</a>
                </li>
                <li><a href="/products">Products</a>
                </li>
                <li><a href="/about-us">About Us</a>
                </li>
          </ul>
        </div><!-- /.navbar-collapse -->
*/