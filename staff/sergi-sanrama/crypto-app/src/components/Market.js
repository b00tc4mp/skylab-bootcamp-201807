import React, { Component } from 'react'
import ListCoins from './ListCoins'
import SearchMarket from './SearchMarket'
import GlobalStats from './GlobalStats'
import ScrollUpButton from 'react-scroll-up-button'
import './styles/Market.css'



class Market extends Component {    

    render(){
        return <div>
                <GlobalStats />      
                <SearchMarket />
                <ListCoins />
                <ScrollUpButton />              
            </div>
    }
}


export default Market