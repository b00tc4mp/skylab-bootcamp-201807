import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ListGroup, ListGroupItem, Badge} from 'reactstrap';
import "./SearchFormFilterList.css"
import classNames from 'classnames/bind';


class SearchFormFilterList extends Component {


    static propTypes = {
      data: PropTypes.array,
      searchFilterTitle: PropTypes.string,
      onSelectFilter: PropTypes.func,
      onClearFilter: PropTypes.func,
      currentlySelected: PropTypes.bool,

    }


  onItemClick = (title, index) => {
 if (!this.props.currentlySelected) this.props.onSelectFilter(title, index);
  }


  render() {
    const selected = this.props.currentlySelected;

    return <ListGroup>
      {this.props.data.map((element,index) =>  <ListGroupItem key={element + index.toString()} className={"justify-content-between " + (selected  ? "disabled" : "")} onClick={() => this.onItemClick(element, index)} tag="a" href="#">{element} { selected && <Badge onClick={this.props.onClearFilter}pill>clear</Badge>}</ListGroupItem>)}
    </ListGroup>


  }


}

export default SearchFormFilterList