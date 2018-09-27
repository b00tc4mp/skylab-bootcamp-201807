import React, { Component } from 'react'
import logic from '../logic/logic'
import swal from 'sweetalert'
// let price = require('crypto-price')

class CompareCurrencies extends Component {
    state = {
        data: {},
        result: {},
        calcValue: 0,
        coin: '',
        coin2: '',
        quantity: '',
        resultCoin: null        
    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const {coin, coin2} = this.state
        this.getValue(coin, coin2)
            .then(() => {
                this.setState({
                    calcValue: this.calcValue()
                })
            }) 
    }

    getValue(coin, coin2){
        return logic.getValue(coin, coin2)
            .then(({data}) => {
                const resultCoin = data[Object.keys(data)[0]]
                return this.setState({ resultCoin })
            })
            .catch(({ message }) => swal(`Compare error`, message))
    }

    calcValue(){
        
        let calculation = Number(this.state.resultCoin) * Number(this.state.quantity)
        return calculation;
    }

    render(){

        const { calcValue, coin2} = this.state

       return (<div>
            <form onSubmit={this.handleSubmit} className='container converter'>
                    <div className="row justify-content-center align-items-center flex-column pb-30">
                        <h2 className="trading__title">Currency Converter Tool</h2>
                        <div className='trading__subtitle'>You can convert any currency to other</div>
                    </div>
                    <div className="row justify-content-center align-items-start">
                        <div className="col-lg-3 cols">
								<input onChange={this.handleChange} type="text" name="coin" placeholder="BTC, ETH, BNB, USD..." className="form-control mb-20" required/>
								<input onChange={this.handleChange} type="number" name="quantity" placeholder="Quantity" className="form-control mb-20" required/>
                            <button className='button_form' type="submit">Calculate</button>
                        </div>
                        <div className="col-lg-3 cols">
                            <input onChange={this.handleChange} type="text" name="coin2" placeholder="BTC, EUR, PHP, ARS.." className="form-control mb-20" required/>
                            <div className="form-control mb-20 disabled">Result: {calcValue} {coin2}</div>

                        </div>
                    </div>
                </form>
        </div>
       )}
}


export default CompareCurrencies