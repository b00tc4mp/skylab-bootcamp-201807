import React, { Component } from 'react'
import logic from '../logic/logic'
import NumberFormat from 'react-number-format'
import './styles/GlobalStats.css'

class GlobalStats extends Component {

    state = {
        stats: null
    }

    componentDidMount() {
        
        return logic.getGlobalStats()
            .then(stats => {
                this.setState({stats})
            })
    }

    render(){
        const { stats } = this.state
        return (<div>
                    {stats &&
                    <div className='row global-stats-container'>
                        <div className='col global-stats-item global-stats-item text-center'>
                            <div className='global-stats__title font-weight-bold'>Active cryptocurrencies:</div>
                            <div className='global-stats__content'>{ <NumberFormat displayType={'text'} />}{stats.stats.active_cryptocurrencies}</div>
                        </div>
                        <div className='col global-stats-item text-center'>
                            <div className='global-stats__title font-weight-bold'>Active markets:</div>
                            <div className='global-stats__content'>{<NumberFormat displayType={'text'} value={stats.stats.active_markets} thousandSeparator={false} />}</div>
                        </div>
                        <div className='col global-stats-item text-center'>
                            <div className='global-stats__title font-weight-bold'>Bitcoin % of market cap:</div>
                            <div className='global-stats__content'>{<NumberFormat displayType={'text'} value={stats.stats.bitcoin_percentage_of_market_cap} suffix='%' thousandSeparator={true} />}</div>
                        </div>
                        <div className='col global-stats-item text-center'>
                            <div className='global-stats__title font-weight-bold'>Total market cap:</div>
                            <div className='global-stats__content'>{<NumberFormat value={stats.stats.quotes.USD.total_market_cap} displayType={'text'} thousandSeparator={true} prefix={'$'} />}</div>
                        </div>
                        <div className='col global-stats-item text-center'>
                            <div className='global-stats__title font-weight-bold'>Total volume 24h:</div>
                            <div className='global-stats__content'>{<NumberFormat value={stats.stats.quotes.USD.total_volume_24h} displayType={'text'} thousandSeparator={true} prefix='$' />}</div>
                        </div>
                    </div>
                    }
                </div>
        )}
}

export default GlobalStats
