import React, { Component } from 'react'
import ListCoins from './ListCoins'
import SearchMarket from './SearchMarket'
import GlobalStats from './GlobalStats'
import ScrollUpButton from 'react-scroll-up-button'
import './styles/Market.css'
import Footer from '../components/Footer'



class Market extends Component {   
    
    state = {
        symbol: '',
        limit: '100'
    }

    onChangeData = (limit, symbol) => {
        this.setState({limit, symbol })
    }

    render(){
        return <div>
                <GlobalStats />      
                <SearchMarket onChangeData={this.onChangeData}/>
                <ListCoins limit={this.state.limit} symbol={this.state.symbol} />
                <ScrollUpButton /> 
                <Footer />   
            </div>
    }
}


export default Market