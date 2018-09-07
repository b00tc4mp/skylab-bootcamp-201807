import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import logic from '../logic/logic'
import moment from 'moment'
import swal from 'sweetalert';

class Portfolio extends Component{

    state = {
        transactions: [],
        name: '',
        quantity: '',
        value: '',
        date: moment().format('YYYY-MM-DD'),
        coinId: '',
        portfolioInvestment: {}
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
            },() => {
                this.calculatePortfolioInvestment() 
            })
        })
        .catch(({ message }) => alert(message))
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
            .catch(({ message }) => alert(message))
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

    calculatePortfolioInvestment(){
        const { transactions } = this.state

        if (transactions.length){
            logic.calculatePortfolioInvestment(transactions)
                .then(portfolioInvestment => {
                    this.setState({
                        portfolioInvestment
                    })
                })
                .catch(({ message }) => alert(message))
        }
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
        const { name, quantity, value , date, coinId  } = this.state
        if(coinId){
            logic.updateCoin(email, coinId, value, date, name, quantity, token )
                    .then(() => this.setState({
                        name: '',
                        quantity: '',
                        value: '',
                        date: moment().format('YYYY-MM-DD'),
                        coinId:''
                    }))
                    .then(() => this.listCoins())
                    .catch(({ message }) => alert(message))
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
                .catch(({ message }) => alert(message))
        }
    }

    renderPortFolioInvestment = () => {
        const { portfolioInvestment } = this.state

        if(Object.keys(portfolioInvestment).length) {
            return Object.keys(portfolioInvestment)
                .map(coin => {
                    return <li>Coin: {coin} - Value: {portfolioInvestment[coin]}</li>
                })
        }

        return ''
    }

    render(){
        return <div>
            <div>Portfolio</div><br/>
                
            <h2>Add a transaction</h2>

            <form onSubmit={this.handleSubmit}>
                <label>Symbol:</label>
                <input onChange={this.handleChange} value={this.state.name} name='name' type='text' placeholder='BTC, ETH ...'/><button>?</button><br/><br/>
                <label>Quantity:</label>
                <input onChange={this.handleChange} value={this.state.quantity} name='quantity' type='number' step='any' placeholder='quantity'/><br/><br/>

                <label>Price unit:</label>
                <input onChange={this.handleChange} value={this.state.value} name='value' type='number' step='any' placeholder='value'/><br/><br/>

                <label>Date:</label>
                <input onChange={this.handleChange} value={this.state.date} name='date' type='date'/><br/><br/>

                <button type='submit'>Submit</button>
                <br/>
            </form>
           <div>
                {this.state.transactions.map(
                    trans => 
                        <div key={trans.coinId}> {
                            `Name: ${trans.name} 
                            Quantity: ${trans.quantity}
                            Price unit: ${trans.value} 
                            Date: ${moment(trans.date).format('DD/MM/YYYY')}`}
                                <a href='' onClick={(e) =>  {e.preventDefault();this.removeCoin(trans.coinId)}} >X</a>
                                <a href='' onClick={(e) => {e.preventDefault();this.editCoin(trans.name, trans.quantity, trans.value, trans.date, trans.coinId)}}> E</a>
                        </div>
                )}
            </div>

            {this.renderPortFolioInvestment()}

        </div>
    }
}

export default withRouter (Portfolio)

