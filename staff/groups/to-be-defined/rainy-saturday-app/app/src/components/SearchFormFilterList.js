import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ListGroup, ListGroupItem, Badge} from 'reactstrap';
import "./SearchFormFilterList.css"
import classNames from 'classnames/bind';


class SearchFormFilterList extends Component {

    static propTypes = {
      data: PropTypes.array.isRequired,
      onSelectFilter: PropTypes.func.isRequired,
      onClearFilter: PropTypes.func.isRequired,
      currentlySelected: PropTypes.bool.isRequired,
      title:PropTypes.string.isRequired,
    }


  onItemClick = (title, index) => {

 if (!this.props.currentlySelected) this.props.onSelectFilter(title, index);
  }


  render() {
    const selected = this.props.currentlySelected;
    const {data,title} = this.props;
    return <section>
      <h4>{title}</h4>
    <ListGroup>
      {(data.length > 0)  && this.props.data.map((element,index) =>  <ListGroupItem key={element + index.toString()} className={"justify-content-between " + (selected  ? "disabled" : "")} onClick={(e) => {e.preventDefault();this.onItemClick(element, index)}} tag="a" href="#">{element} { selected && <Badge onClick={this.props.onClearFilter}pill>clear</Badge>}</ListGroupItem>)}
      {(data.length === 0)  && <span>No results. Perhaps clear the other filters...</span>}
    </ListGroup>
    </section>

  }


}

export default SearchFormFilterList