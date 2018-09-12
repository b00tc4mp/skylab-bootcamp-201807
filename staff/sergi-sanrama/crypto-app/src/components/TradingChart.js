import React, { Component } from 'react'
import CryptowatchEmbed from 'cryptowatch-embed';
import './styles/TradingChart.css'
new CryptowatchEmbed('bitfinex', 'btcusd');


class TradingChart extends Component {

    state = {
        coin: 'BTC',
        coin2: 'USD',
        timePeriod: '1d'
    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value.toUpperCase()
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.createChart()

    }

    createChart(){
        const {coin, coin2, timePeriod} = this.state

        let chart = new CryptowatchEmbed('bitfinex', `${coin}${coin2}`, {
            timePeriod: `${timePeriod}`,
            width: 960,
            height: 600
        })

        document.getElementById('chart-container').innerHTML = ''

        chart.mount('#chart-container')
    }

        render(){
            const { coin, coin2, timePeriod} = this.state
            return(<div className='' >
            <form onSubmit={this.handleSubmit} className='container converter'>
                    <div className="row justify-content-center align-items-center flex-column pb-30">
                        <h2 className="trading__title">Create Trading Charts</h2>
                        <div className='trading__subtitle'>Choose cryptocurrency, euro/dolar and Time Period</div>
                    </div>
                    <div className="row justify-content-center align-items-start">
                        <div className="col-lg-3 cols">
                        <select onChange={this.handleChange} class='form-control' type='text' name='coin'>
                                <option>BTC</option>
                                <option>EOS</option>
                                <option>IOT</option>
                                <option>ETH</option>
                                <option>NEO</option>
                                <option>XLM</option>
                                <option>XVG</option>
                            </select>

                            <select onChange={this.handleChange} class='form-control' type='text' name='coin2'>
                                <option>USD</option>
                                <option>EUR</option>
                            </select>
                    
                            <select onChange={this.handleChange} name='timePeriod' class='form-control'>
                                <option>1m</option>
                                <option>3m</option>
                                <option>5m</option>
                                <option>15m</option>
                                <option>30m</option>
                                <option>1h</option>
                                <option>2h</option>
                                <option>4h</option>
                                <option>6h</option>
                                <option>12h</option>
                                <option>1d</option>
                                <option>3d</option>
                                <option>1w</option>  
                            </select>
                            <button className='button_form' type='submit'>Create</button>
                        </div>
                    </div>
                <div className='row justify-content-center align-items-start'>
                    <h3>{coin} / {coin2} / {timePeriod.toUpperCase()}</h3>
                    <div className='trading-chart row container justify-content-center align-items-center' id='chart-container'></div>
                </div>
                </form>
        </div>
            )
        }
}

export default TradingChart
