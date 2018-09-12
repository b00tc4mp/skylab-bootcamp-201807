import React, {
    Component
} from 'react'
import {
    withRouter
} from 'react-router-dom'
import logic from '../logic/logic'
import History from './History'
import Stats from './Stats'
import ScrollUpButton from 'react-scroll-up-button'
import moment from 'moment'
import swal from 'sweetalert'
import './styles/Portfolio.css'
import {
    Col,
    Button,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap'

class Portfolio extends Component {

    state = {
        chartData: {},
        getChartDataQuantity: {},
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
                        'rgba(255, 99, 132, 0.6',
                        'rgba(54, 162, 235, 0.6',
                        'rgba(255, 206, 86, 0.6',
                        'rgba(75, 192, 192, 0.6',
                        'rgba(153, 102, 255, 0.6',
                        'rgba(255, 159, 64, 0.6',
                        'rgba(255, 99, 132, 0.6',
                    ]
                }]
            },
            chartData2: {
                labels,
                datasets: [{
                    label: 'Portfolio Quantity',
                    data:data2,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6',
                        'rgba(255, 159, 64, 0.6',
                        'rgba(153, 102, 255, 0.6',
                        'rgba(255, 99, 132, 0.6',
                        'rgba(75, 192, 192, 0.6',
                        'rgba(255, 206, 86, 0.6',
                        'rgba(54, 162, 235, 0.6',
                    ]
                }]
            }
        })
    }



    handleChange = (e) => {
        const {
            name,
            value
        } = e.target
        console.log(value)
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
                        portfolioInvestment
                    }, () => {
                        this.getChartData()
                    })
                })
                .catch(({
                    message
                }) => swal(message))
        }
    }


    renderPortFolioInvestment = () => {
        const {
            portfolioInvestment
        } = this.state

        if (Object.keys(portfolioInvestment).length) {
            return Object.keys(portfolioInvestment)
                .map(coin => {
                    return (

                        <li> Coin: {coin} - Value: {portfolioInvestment[coin].val}, Quantity: {portfolioInvestment[coin].quantity} </li>
                    )
                })
        }

        return ''
    }

    render() {
        return <div>
            <div> Portfolio </div><br/>
                <Form className = 'form_add_transaction'onSubmit = {this.handleSubmit}>
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
                        <Button type = 'submit' > Add </Button> 
                        </Col>
                        </FormGroup>
                    </FormGroup>
                </Form>


        {this.renderPortFolioInvestment()} <History transactions = {this.state.transactions}/>

        <Stats chartData = {this.state.chartData} chartData2 = {this.state.chartData2}/>

        <ScrollUpButton />
            </div>
    }
}

export default withRouter(Portfolio)