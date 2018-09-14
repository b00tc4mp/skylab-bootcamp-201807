import React, { Component } from 'react'
import './styles/Navbar.css'

class Navbar extends Component {

    render() {
        return (
            <div className='navbar-container'>
                <header className='navbar fixed-top'>
                    <button className='navbar-btn'><a href='/#/user/portfolio'><img src='images/icons/icon_portfolio.png'/></a></button>
                    <button className='navbar-btn'><a href='/#/trading'><img src='images/icons/icon_trading.png'/></a></button>
                    <button className='navbar-btn'><a href='/#/market'><img src='images/icons/icon_market.png'/></a></button>
                    <button className='navbar-btn'><a href='/#/news'><img src='images/icons/icon_news.png'/></a></button>
                    <button className='navbar-btn'><a href='/#/user/profile'><img src='images/icons/icon_profile.png'/></a></button> 
                </header>
                <div></div>
            </div>
            
        )
    }
}

export default Navbar