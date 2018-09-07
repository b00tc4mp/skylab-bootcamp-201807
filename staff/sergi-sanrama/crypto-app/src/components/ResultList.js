import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import logic from '../logic/logic'

class ResultList extends Component {
    state = {
        coins: []
    }

    componentDidMount(){
        this.getCoins()
    }

    getCoins(){
        logic.getCoins(30)
            .then(coins => {
               return this.setState({ coins: coins.data })
            })
    }

    render() {
      const { coins } = this.state
        return (
            <div className='result__list__container'>
                    {coins.map(data => <div key={data.rank}>
                        <div className='list__container'>
                            <div className='list__item-rank'>{data.rank}</div>
                            <div className='list__item-name'>{data.name}</div>
                            <div className='list__item-symbol'>{data.symbol}</div>  
                            <div className='list__item-price_usd'>{data.price_usd}</div>
                            <div className='list__item-price_btc'>{data.price_btc}</div>
                            <div className='list__item-market_cap'>{data.market_cap_usd}</div>
                            <div className='list__item-total_supply'>{data.total_supply}</div>
                            <div className='list__item-max_supply'>{data.max_supply}</div>
                            <div className='list__item-percernt_change_1h'>{data.percent_change_1h}</div>
                            <div className='list__item-percernt_change_24h'>{data.percent_change_24h}</div>
                            <div className='list__item-percernt_change_7d'>{data.percent_change_7d}</div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default ResultList