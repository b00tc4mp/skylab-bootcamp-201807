import React, { Component } from 'react'
import logic from '../logic/logic'
import NumberFormat from 'react-number-format'
import './styles/ListCoins.css'
import { Table } from 'reactstrap'


class ListCoins extends Component {
    state = {
        coins: [],
        limit:''
    }

    componentDidMount(){
        this.getCoins()
        this.interval = setInterval(() => this.getCoins(), 60 * 1000)
    }   

    getCoins(limit){
        logic.getCoins(limit)
            .then(coins => {
               return this.setState({ coins: coins.data })
            })
    }

    render() {
      const { coins } = this.state
      
      return (
          <div className='container col-sm-12 history-table text-center'>
                <Table size="xs" hover dark responsive striped>
                  <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Name</th>
                            <th>Symbol</th>
                            <th>Price USD</th>
                            <th>Price BTC</th>
                            <th>Market Cap</th>
                            <th>1h</th>
                            <th>24h</th>
                            <th>7d</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coins.map(data => {
                            let negative1h = '', negative24h = '', negative7d = ''
                            let positive1h = '', positive24h = '', positive7d = ''

                            if(Number(data.percent_change_1h) < 0) {negative1h = 'negative' } 
                            if(Number(data.percent_change_24h) < 0) {negative24h = 'negative'}
                            if(Number(data.percent_change_7d) < 0) {negative7d = 'negative' }
                            if(Number(data.percent_change_1h) > 0) {positive1h = 'positive' }
                            if(Number(data.percent_change_24h) > 0) {positive24h = 'positive' }
                            if(Number(data.percent_change_7d) > 0) {positive7d = 'positive' }

                            return (
                                <tr>
                                    <td>{data.rank}</td>
                                    <td>{data.name}</td>
                                    <td>{data.symbol}</td>  
                                    <td>${Number(data.price_usd).toFixed(2)}</td>
                                    <td>{data.price_btc}</td>
                                    <td>{<NumberFormat value={data.market_cap_usd} displayType={'text'} thousandSeparator={true} prefix={'$'} />}</td>
                                    <td className={`${negative1h} ${positive1h}`}>{data.percent_change_1h} %</td>
                                    <td className={`${negative24h} ${positive24h}`}>{data.percent_change_24h} %</td>
                                    <td className={`${negative7d} ${positive7d}`}>{data.percent_change_7d} %</td>
                                </tr>
                                
                                )
                        })}
                     </tbody>
                </Table>
            </div>
      )
}}

export default ListCoins