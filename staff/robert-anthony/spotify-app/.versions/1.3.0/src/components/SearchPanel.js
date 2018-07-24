import React, {Component} from "react";
import PropTypes from 'prop-types';

class SearchPanel extends Component {


  render() {
    return <form onSubmit={this.onSearch}>
      <input onChange={this.keepQuery} type="text"/>
      <button type="submit">Search</button>
    </form>


  }

  onSearch = (e) => {
    e.preventDefault();
    console.log("search submitted", this.state.query)
    this.props.onSearch(this.state.query)
  };

  keepQuery = (e) => {
    const query = e.target.value;
    this.setState({query});
}




}


export default SearchPanel;
