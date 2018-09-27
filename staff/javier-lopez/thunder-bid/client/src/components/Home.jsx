import React, { Component } from 'react'
import logic from '../logic'
import Product from './Product'
import socketIOClient from "socket.io-client"
const socket = socketIOClient('https://radiant-forest-85690.herokuapp.com')

class Home extends Component {

    state = {
        query: '',
        products: [],
        selectedOption: ''
    }

    componentDidMount() {
        this.fetchProducts()
            .then(() => socket.on('fetch price', () => this.fetchProducts()))
    }

    fetchProducts = () => {
        return logic.listProducts(this.state.query, this.state.selectedOption)
            .then(({ data }) => {
                this.setState({
                    products: data
                })
            })
    }


    findProduct = e => {
        e.preventDefault()
        logic.listProducts(this.state.query, this.state.selectedOption)
            .then(({ data }) => {
                this.setState({
                    products: data
                })
            })
    }

    resetSearch = () => {
        this.setState({
            query: '',
            selectedOption: ''
        })
        logic.listProducts('', '')
            .then(({ data }) => {
                this.setState({
                    products: data
                })
            })
    }

    handleChange = e => {
        const { name, value } = e.target
        this.setState({
            [name]: value,
        })
    }

    handleCategory = e => {
        const { value } = e.target
        this.setState({
            selectedOption: value,
        })
    }

    render() {
        return <div className="container">
            <div className="row mt-5">
                <div className="col-3">
                    <form onSubmit={this.findProduct} style={{backgroundColor:'#F8F9FA', border: '1px solid #e8e8e8', padding: '15px', borderRadius: '5px'}}>
                        <h3>Search</h3>
                        <div className="form-group">
                            <input type="text" className="form-control" value={this.state.query} name='query' onChange={this.handleChange} placeholder="Write something..." />
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" value='' name='category' onChange={this.handleCategory} checked={this.state.selectedOption === ''} />
                                    <label className="form-check-label">All</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" value='Movies' name='category' onChange={this.handleCategory} checked={this.state.selectedOption === 'Movies'} />
                                    <label className="form-check-label">Movies</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" value='Music' name='category' onChange={this.handleCategory} checked={this.state.selectedOption === 'Music'} />
                                    <label className="form-check-label">Music</label>
                                </div>
                            </div>
                            <div className='col'>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" value='Marvel' name='category' onChange={this.handleCategory} checked={this.state.selectedOption === 'Marvel'} />
                                    <label className="form-check-label">Marvel</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" value='Games' name='category' onChange={this.handleCategory} checked={this.state.selectedOption === 'Games'} />
                                    <label className="form-check-label">Games</label>
                                </div>
                            </div>
                        </div>
                        <button type='submit' className="btn btn-info mr-2 mt-4">Search</button>
                        <button type="button" className="btn btn-danger mt-4" onClick={this.resetSearch}>Reset</button>
                    </form>
                </div>
                <div className="col-1"></div>
                <div className="col-8">
                    <div className="row">
                        {this.state.products === undefined && <h2>There is no products with these characteristics</h2> }
                        {this.state.products !== undefined && this.state.products.map(e => {
                            return <Product product={e} key={e._id}/>
                        })}
                    </div>
                </div>
            </div>
        </div>
    }
}

export default Home