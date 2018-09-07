import React, { Component } from 'react'

import './styles/Navbar.css'

class Navbar extends Component {

    render() {
        const { props: { Portfolio, Market, News, Profile } } = this
        return (
            <div className="navbar-container">
            <div></div>
                <header className="navbar">
                    <button className="navbar-btn" onClick={Portfolio}><a href='/#/user/portfolio'><img src='images/icons/icon_portfolio.png'/></a></button>
                    <button className="navbar-btn" onClick={Market}><a href='/#/market'><img src='images/icons/icon_market.png'/></a></button>
                    <button className="navbar-btn" onClick={News}><a href='/#/news'><img src='images/icons/icon_news.png'/></a></button>
                    <button className="navbar-btn" onClick={Profile}><a href='/#/user/profile'><img src='images/icons/icon_profile.png'/></a></button> 
 
                </header>
                <div></div>
            </div>
        )
    }
}

export default Navbar