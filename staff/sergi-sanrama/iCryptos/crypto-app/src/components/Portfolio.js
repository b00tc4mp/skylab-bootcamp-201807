import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic/logic'
import History from './History'
import Stats from './Stats'
import ScrollUpButton from 'react-scroll-up-button'
import moment from 'moment'
import swal from 'sweetalert'
import './styles/Portfolio.css'
import { Table } from 'reactstrap'
import { Col, Button, Form, FormGroup, Label, Input, Row } from 'reactstrap'

class Portfolio extends Component {

    state = {
        chartData: {},
        chartData2: {},
        portfolioInvestment: {},
        transactions: [],
        name: '',
        quantity: '',
        value: '',
        date: moment().format('YYYY-MM-DD'),
        coinId: '',
    }

    componentDidMount() {
        this.listCoins()
    }
    
    handleChange = (e) => {
        const { name, value} = e.target
        this.setState({
            [name]: value
        })
    }
    
    handleSubmit = (e) => {
        e.preventDefault()
        const {
            email,
            token
        } = this.props
        const {
            name,
            quantity,
            value,
            date,
            coinId
        } = this.state
        if (coinId) {
            logic.updateCoin(email, coinId, value, date, name, quantity, token)
                .then(() => this.setState({
                    name: '',
                    quantity: '',
                    value: '',
                    date: moment().format('YYYY-MM-DD'),
                    coinId: ''
                }))
                .then(() => this.listCoins())
                .catch(({
                    message
                }) => swal("Error", message, "error"))
        } else {
            logic.addCoin(email, name, quantity, value, date, token)
                .then(() => this.setState({
                    name: '',
                    quantity: '',
                    value: '',
                    date: '',
                    coinId: ''
                }))
                .then(() => this.listCoins())
                .catch(({
                    message
                }) => swal("Error", message, "error"))
        }
    }

        
    listCoins = () => {
        const {
            email,
            token
        } = this.props
        logic.listCoins(email, token)
        .then((transactions) => {
            this.setState({
                transactions
            }, () => {
                this.calculatePortfolioInvestment()
            })
        })
        .catch(({
            message
        }) => alert(message))
    }
    
    removeCoin = (coinId) => {
        const {
            email,
            token
        } = this.props
        logic.removeCoin(email, coinId, token)
        .then(() => {
                this.setState({
                    coinId: ''
                })
                
                this.listCoins()
            })
            .catch(({
                message
            }) => swal(message))
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

    calculatePortfolioInvestment() {
        const {
            transactions
        } = this.state

        if (transactions.length) {
            logic.calculatePortfolioInvestment(transactions)
            .then(portfolioInvestment => {
                    this.setState({
                        portfolioInvestment,
                        chartData: {},
                        chartData2: {}
                    }, () => {
                        this.getChartData()
                    })
                })
                .catch(({
                    message
                }) => swal(message))
            }
        else {
            this.setState({ portfolioInvestment: {}, chartData: {}, chartData2: {} })
        }
    }
    
    renderPortFolioInvestment = () => {
        const {
            portfolioInvestment
        } = this.state
        
        return Object.keys(portfolioInvestment)
            .map(coin => {
                let negative = '', positive = ''
                
                if(Number(portfolioInvestment[coin].val) < 0) {negative = 'negative' }
                if(Number(portfolioInvestment[coin].val) > 0) {positive = 'positive' }
                
                return (
                    <tr>
                        <td>{coin}</td>
                        <td className={`${negative} ${positive}`}>{portfolioInvestment[coin].val}</td>
                        <td className={`${negative} ${positive}`}>{portfolioInvestment[coin].quantity}</td>
                    </tr>     
                )
            })
        }

    getChartData() {
        const {
            portfolioInvestment
        } = this.state

        const labels = Object.keys(portfolioInvestment)
        const data = Object.values(portfolioInvestment).map(coin => coin.val)
        const data2 = Object.values(portfolioInvestment).map(coin => coin.quantity)

        this.setState({
            chartData: {
                labels,
                datasets: [{
                    label: 'Portfolio Value',
                    data,
                    backgroundColor: [
                        'rgba(92, 164, 105, 0.6',
                        'rgba(75, 192, 192, 0.6',
                        'rgba(255, 159, 64, 0.6',
                        'rgba(255, 99, 132, 0.6',
                        'rgba(54, 162, 235, 0.6',
                        'rgba(255, 99, 132, 0.6',
                        'rgba(153, 102, 255, 0.6',
                    ]
                }]
            },
            chartData2: {
                labels,
                datasets: [{
                    label: 'Portfolio Quantity',
                    data:data2,
                    backgroundColor: [
                        'rgba(255, 159, 64, 0.6',
                        'rgba(54, 162, 235, 0.6',
                        'rgba(255, 99, 132, 0.6',
                        'rgba(153, 102, 255, 0.6',
                        'rgba(255, 99, 132, 0.6',
                        'rgba(75, 192, 192, 0.6',
                        'rgba(255, 206, 86, 0.6',
                    ]
                }]
            }
        })
    }

    render() {
        return <div>
                <Col>
                    <Form className = 'form_add_transaction ' onSubmit = {this.handleSubmit}>
                        <FormGroup row>
                            <Label for ='Symbol' sm={1}> Symbol </Label> 
                            <Col sm = {1} >
                                <Input onChange = {this.handleChange} value = {this.state.name} name='name' type ='text' placeholder ='BTC...' />
                            </Col> 
                            <Label for ='Symbol' sm={1}> Quantity </Label> 
                            <Col sm={2}>
                                <Input onChange = {this.handleChange} value = {this.state.quantity}name='quantity' type ='number'placeholder = '5, 0.1, -3...' />
                            </Col> 
                                <Label for ='Symbol' sm={1}> Price $ </Label> 
                            <Col sm={2}>
                                <Input onChange = {this.handleChange} value = {this.state.value} name='value' type = 'number' placeholder ='1 , 6500, 0.05...' />
                            </Col>
                                <Label for ='Symbol' sm={1}> Date </Label> 
                            <Col sm={2}>
                                <Input onChange = {this.handleChange} value = {this.state.date} name='date' type = 'date' placeholder ='BTC, ETH...' />
                            </Col> 
                            <FormGroup check row>
                                <Col sm = {{
                                        size: 10,
                                        offset: 2
                                        }}>
                                <Button type='submit'>Add</Button> 
                            </Col>
                            </FormGroup>
                        </FormGroup>
                    </Form>
                </Col>
                    
                <Row>
                    <Col sl='4' lg='4'>
                    {Object.keys(this.state.portfolioInvestment).length > 0 &&
                        <div className='container history-table text-center'>
                            <Table size="sm-1" hover dark responsive striped>
                                <thead>
                                    <tr>
                                        <th>Asset</th>
                                        <th>Total value</th>
                                        <th>Total quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {this.renderPortFolioInvestment()}
                                </tbody>
                            </Table>
                        </div>
                    }
                    </Col>
                    <Col sm={{ size: '8' }}>
                        {this.state.transactions.length > 0 && <History transactions = {this.state.transactions} listCoins={this.listCoins} editCoin={this.editCoin} />}
                    </Col>
                </Row>
                <Col lg='12'>
                    {this.state.transactions.length > 0 && <Stats chartData = {this.state.chartData} chartData2 = {this.state.chartData2} />}
                </Col>
                
                <ScrollUpButton />

        </div> 
    }
}

export default withRouter(Portfolio)