import React, { Component } from 'react'

class Search extends Component {
  
  state = { 
    query: this.props.query 
  }

  handleInputChange = event => {
    var query = event.target.value
    this.setState({ query })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.onSearch(this.state.query)
  }
  
  render() {

    let inputClassNameModifier
    switch (this.props.position) {
      case 'header':
        inputClassNameModifier = 'search__query--header'
        break
      default:
        inputClassNameModifier = ''
    }

    return (
      <form className="search" onSubmit={this.handleSubmit}>
          <input 
            type="text" 
            placeholder={this.props.inputPlaceholder}
            className={ 'search__query ' + inputClassNameModifier }
            onChange={this.handleInputChange}
            value={this.state.query}
            />
          { 
            this.props.inputHelp && 
            <div className="search__help">
                {this.props.inputHelp}
            </div>
          }
      </form>
    )
  }
}

Search.defaultProps = {
  query: ''
};

export default Search