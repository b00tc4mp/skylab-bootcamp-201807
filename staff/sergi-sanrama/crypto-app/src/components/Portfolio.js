import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import logic from '../logic/logic'
import moment from 'moment'

class Portfolio extends Component{

    state = {
        transactions: [],
        name: '',
        quantity: '',
        value: '',
        date: moment().format('YYYY-MM-DD'), // 2018-09-05
        coinId: ''
    }


    componentDidMount(){
        this.listCoins()  
    }

    listCoins = () => {
        const {email, token} = this.props
        logic.listCoins(email, token)
        .then((transactions) => {
            this.setState({
                transactions
            })
        })
    }

    removeCoin = (coinId) => {
        const {email, token} = this.props
        logic.removeCoin(email, coinId, token)
            .then(() => {
                this.setState({
                    coinId: ''  
                })
                this.listCoins()
            })
    }

    editCoin = (name, quantity, value, date, coinId) => {
        this.setState({
            name,
            quantity,
            value,
            date: moment(date).format('YYYY-MM-DD'),
            coinId 
        })
    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { email, token } = this.props
        const { name, quantity, newQuantity, value , date, coinId  } = this.state
        if(coinId){
            logic.updateCoin(email, coinId, value, date, name, quantity, token )
                    .then(() => this.setState({
                        name: '',
                        quantity: '',
                        value: '',
                        date: '',
                        coinId:''
                    }))
                    .then(() => this.listCoins())
        }else{
            logic.addCoin(email, name, quantity, value, date, token)
                .then(() => this.setState({
                    name: '',
                    quantity: '',
                    value: '',
                    date: '',
                    coinId:''
                }))
                .then(() => this.listCoins())
        }
    }

    render(){
        
        return <div>
            <div>Portfolio > Transactions</div><br/>

            <h1>Add a transaction</h1>
            {/* <p>{this.state.dateNow}</p> */}
            <form onSubmit={this.handleSubmit}>
                <label>Symbol:</label>
                <input onChange={this.handleChange} value={this.state.name} name='name' type='text' placeholder='BTC, ETH ...'/><button>?</button><br/><br/>

                <label>Quantity:</label>
                <input onChange={this.handleChange} value={this.state.quantity} name='quantity' type='number' step="any" placeholder='quantity'/><br/><br/>

                <label>Price unit:</label>
                <input onChange={this.handleChange} value={this.state.value} name='value' type='number' step="any" placeholder='value'/><br/><br/>

                <label>Date:</label>
                <input onChange={this.handleChange} value={this.state.date} name='date' type='date'/><br/><br/>

                <button type='submit'>Submit</button>
                <br/>

                <a href='/#/market'>go to Market</a>
            
            </form>
            <ul>
                {this.state.transactions.map(trans => <li key={trans.coinId}> {`Name: ${trans.name} Quantity: ${trans.quantity} Price unit: ${trans.value} Date: ${moment(trans.date).format('DD/MM/YYYY')}`}<a href='' onClick={(e) =>  {e.preventDefault();this.removeCoin(trans.coinId)}} >X</a> <a href="" onClick={(e) => {e.preventDefault();this.editCoin(trans.name, trans.quantity, trans.value, trans.date, trans.coinId)}}> E</a> </li>)}
            </ul>

        </div>
    }
}


export default withRouter (Portfolio)