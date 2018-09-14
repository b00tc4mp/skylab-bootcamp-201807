import React, { Component } from 'react'
import './styles/SearchMarket.css'
class SearchMarket extends Component{ 

  state = {
    symbol: '',
    limit: '100'
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({
        [name]: value
    })
}

handleSubmit = (e) => {
  e.preventDefault()
  this.props.onChangeData(this.state.limit, this.state.symbol.toUpperCase())
}


  render() {
      return  <div id="searchMarket">
              <form onSubmit={this.handleSubmit}>
                <div className="form-row row justify-content-md-center">
                  <div className="col-sm-2">
                    <input onChange={this.handleChange} type="text" name="symbol" placeholder="Search a coin by symbol" className="form-control mb-20" />
                  </div>
                  <div className="col-sm-2">
                    <input onChange={this.handleChange} type="number" name="limit" placeholder="nº Coins: 10, 100, 1000..." className="form-control mb-20" />
                  </div>  
                  <input className='btn-search' type="image" name="submit" src="images/icons/icon_search.jpg" border="0" alt="Submit" />
                </div>
              </form>
            </div>
      }
}



    export default SearchMarket