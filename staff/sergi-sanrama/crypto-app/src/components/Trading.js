import React, { Component } from 'react'
import TradingChart from './TradingChart'
import CompareCurrencies from './CompareCurrencies'
import ScrollUpButton from 'react-scroll-up-button'

class Trading extends Component {

    render() {
        return (
            <div>
                <CompareCurrencies />
                <TradingChart />
                <ScrollUpButton />
            </div>
            
        )
    }
}

export default Trading