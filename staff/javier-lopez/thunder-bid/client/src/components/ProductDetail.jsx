import React, { Component } from "react"
import { Link } from 'react-router-dom'
import logic from '../logic'
import swal from 'sweetalert2'
import socketIOClient from "socket.io-client"
const socket = socketIOClient('https://radiant-forest-85690.herokuapp.com')

class ProductDetail extends Component {
    state = {
        userId: sessionStorage.getItem('userId') || '',
        token: sessionStorage.getItem('token') || '',
        product: '',
        productId: '',
        productPrice: ''
    }

    componentDidMount() {
        this.fetchPrice()

        socket.on('fetch price', () => this.fetchPrice())
    }

    componentWillUnmount() {
        socket.disconnect()
    }

    fetchPrice = () => {
        return logic.retrieveProduct(this.props.id)
            .then(({ data }) => {
                this.setState({
                    product: data,
                    productId: data._id
                })
            })
    }

    handleChange = (e) => {
        const { name, value } = e.target

        this.setState({
            [name]: value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        const { userId, token, productPrice, productId } = this.state
        const bidPrice = Number(productPrice)
        logic.addBid(productId, userId, bidPrice, token)
            .then(() => this.fetchPrice())
            .then(() => swal({
                title: "Bidded!",
                text: 'You will see your bid on your bid list.',
                type: "success",
                confirmButtonText: "Okay"
            }))
            .catch(({ message }) =>
                swal({
                    title: "Failed!",
                    text: message,
                    type: "error",
                    confirmButtonText: "Try again"
                }))
    }

    saveWish = e => {
        e.preventDefault()
        const { productId, userId, token } = this.state

        logic.addWish(productId, userId, token)
            .then(() => swal({
                title: "Saved!",
                text: 'You will see the product on your wish list.',
                type: "success",
                confirmButtonText: "Okay"
            }))
            .catch(({ message }) =>
                swal({
                    title: "Failed!",
                    text: message,
                    type: "error",
                    confirmButtonText: "Try again"
                })
            )
    }

    isLoggedIn = () => {
        return !!this.state.userId
    }

    goToLogin = () => {
        this.props.history.push('/login')
    }

    render() {
        return <div className="container">
            <div className="row pt-5">
                <div className="col-6" style={{paddingLeft: '100px'}}>
                    <img alt='product' src={this.state.product.image} width='200' />
                </div>
                <div className="col-6">
                    <h1>{this.state.product.title}</h1>
                    <p>{this.state.product.description}</p>
                    <p style={{fontSize: '20px'}}> {this.state.product && this.state.product.bids.length ? this.state.product.bids[this.state.product.bids.length - 1].price : this.state.product.initialPrice} €</p>
                    {this.isLoggedIn()
                        ? this.state.product.closed
                            ? <p>This product is closed</p>
                            : <form className="form-inline" onSubmit={this.handleSubmit}>
                                <div className="form-group mb-2">
                                    <input type="number" className="form-control" name='productPrice' onChange={this.handleChange} />
                                </div>
                                <button type="submit" className="btn btn-success mb-2 ml-2">Confirm bid</button>
                            </form>
                        : <p>You should Log In to make a bid</p>}
                    {this.isLoggedIn() && !this.state.product.closed && <Link to='' onClick={this.saveWish} className="text-primary">Mark it as a wish!</Link>}

                </div>
            </div>
        </div>
    }
}
export default ProductDetail